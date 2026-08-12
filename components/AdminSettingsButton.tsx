'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import { getSession } from '@/lib/store/auth-store';

function hasAdminSession(): boolean {
  const session = getSession();
  return session?.role === 'admin' || session?.role === 'super_admin';
}

export function AdminSettingsButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const refresh = () => setVisible(hasAdminSession());

    refresh();
    window.addEventListener('kvideo-session-changed', refresh);
    window.addEventListener('storage', refresh);

    return () => {
      window.removeEventListener('kvideo-session-changed', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  if (!visible) return null;

  return (
    <Link
      href="/settings"
      aria-label="设置"
      title="设置"
      className="fixed right-4 bottom-4 z-[9999] flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-color)] shadow-[var(--shadow-md)] backdrop-blur-xl transition hover:scale-105 hover:text-[var(--accent-color)]"
    >
      <Settings size={20} />
    </Link>
  );
}
