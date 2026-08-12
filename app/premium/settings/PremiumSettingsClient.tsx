'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AddSourceModal } from '@/components/settings/AddSourceModal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { PremiumSourceSettings } from '@/components/settings/PremiumSourceSettings';
import { DisplaySettings } from '@/components/settings/DisplaySettings';
import { PlayerSettings } from '@/components/settings/PlayerSettings';
import { AppVersionSettings } from '@/components/settings/AppVersionSettings';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { AdminGate } from '@/components/AdminGate';
import { isAdmin } from '@/lib/store/auth-store';
import { usePremiumSettingsPage } from './hooks/usePremiumSettingsPage';
import Link from 'next/link';

export default function PremiumSettingsClient() {
    const router = useRouter();

    useEffect(() => {
        if (!isAdmin()) router.replace('/admin');
    }, [router]);

    const settings = usePremiumSettingsPage();

    return (
        <AdminGate>
            <div className="min-h-screen bg-black">
                <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
                    <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[var(--radius-2xl)] shadow-[var(--shadow-sm)] p-6">
                        <div className="flex items-center gap-4">
                            <Link href="/premium" className="w-10 h-10 flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-color)]" aria-label="返回">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                            </Link>
                            <div><h1 className="text-2xl font-bold text-[var(--text-color)]">高级模式设置</h1><p className="text-sm text-[var(--text-color-secondary)]">管理高级模式的内容源和偏好设置</p></div>
                        </div>
                    </div>

                    <AppVersionSettings />
                    <AccountSettings />
                    <PlayerSettings fullscreenType={settings.fullscreenType} onFullscreenTypeChange={settings.handleFullscreenTypeChange} proxyMode={settings.proxyMode} onProxyModeChange={settings.handleProxyModeChange} seekStepSeconds={settings.seekStepSeconds} onSeekStepSecondsChange={settings.handleSeekStepSecondsChange} danmakuApiUrl={settings.danmakuApiUrl} onDanmakuApiUrlChange={settings.handleDanmakuApiUrlChange} danmakuOpacity={settings.danmakuOpacity} onDanmakuOpacityChange={settings.handleDanmakuOpacityChange} danmakuFontSize={settings.danmakuFontSize} onDanmakuFontSizeChange={settings.handleDanmakuFontSizeChange} danmakuDisplayArea={settings.danmakuDisplayArea} onDanmakuDisplayAreaChange={settings.handleDanmakuDisplayAreaChange} />
                    <DisplaySettings realtimeLatency={settings.realtimeLatency} searchDisplayMode={settings.searchDisplayMode} rememberScrollPosition={settings.rememberScrollPosition} onRealtimeLatencyChange={settings.handleRealtimeLatencyChange} onSearchDisplayModeChange={settings.handleSearchDisplayModeChange} onRememberScrollPositionChange={settings.handleRememberScrollPositionChange} locale={settings.locale} onLocaleChange={settings.handleLocaleChange} blockedCategories={settings.blockedCategories} onBlockedCategoriesChange={settings.handleBlockedCategoriesChange} />
                    <PremiumSourceSettings sources={settings.premiumSources} onSourcesChange={settings.handleSourcesChange} onRestoreDefaults={() => settings.setIsRestoreDefaultsDialogOpen(true)} onAddSource={() => { settings.setEditingSource(null); settings.setIsAddModalOpen(true); }} onEditSource={settings.handleEditSource} />
                </div>

                <AddSourceModal isOpen={settings.isAddModalOpen} onClose={() => { settings.setIsAddModalOpen(false); settings.setEditingSource(null); }} onAdd={settings.handleAddSource} existingIds={settings.premiumSources.map(s => s.id)} initialValues={settings.editingSource} />
                <ConfirmDialog isOpen={settings.isRestoreDefaultsDialogOpen} title="恢复默认高级源" message="这将重置所有高级源为默认配置。自定义源将被删除。是否继续？" confirmText="恢复" cancelText="取消" onConfirm={settings.handleRestoreDefaults} onCancel={() => settings.setIsRestoreDefaultsDialogOpen(false)} />
            </div>
        </AdminGate>
    );
}
