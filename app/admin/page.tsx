'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { clearSession, getSession, setSession } from '@/lib/store/auth-store';

const ADMIN_PASSWORD = 'wwz554320';

export default function AdminPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (session?.role === 'super_admin' || session?.role === 'admin') {
      router.replace('/settings');
      return;
    }
    setChecking(false);
  }, [router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    if (password !== ADMIN_PASSWORD) {
      setError('管理员密码错误');
      setSubmitting(false);
      return;
    }

    clearSession();
    setSession(
      {
        accountId: 'local-admin',
        profileId: 'local-admin',
        username: 'admin',
        name: '超级管理员',
        role: 'super_admin',
        customPermissions: [],
        mode: 'legacy',
      },
      true,
    );

    router.replace('/settings');
  };

  if (checking) {
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] bg-[image:var(--bg-image)] text-[var(--text-color)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-[var(--radius-2xl)] border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-[25px] p-8 shadow-[var(--shadow-md)]"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-[var(--radius-full)] bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center border border-[var(--glass-border)]">
            <Lock size={30} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center">管理员入口</h1>
        <p className="text-sm text-center text-[var(--text-color-secondary)] mt-2 mb-6">
          输入管理员密码进入设置中心
        </p>

        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError('');
          }}
          placeholder="管理员密码"
          autoComplete="current-password"
          autoFocus
          className={`w-full px-4 py-3 rounded-[var(--radius-2xl)] bg-[var(--glass-bg)] border ${error ? 'border-red-500' : 'border-[var(--glass-border)]'} focus:outline-none focus:border-[var(--accent-color)] text-[var(--text-color)]`}
        />

        {error && <p className="text-sm text-red-500 text-center mt-3">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-5 py-3 rounded-[var(--radius-2xl)] bg-[var(--accent-color)] text-white font-bold hover:brightness-110 disabled:opacity-50"
        >
          {submitting ? '验证中...' : '进入管理模式'}
        </button>
      </form>
    </main>
  );
}
