'use client';

import { useEffect } from 'react';

const SERVICE_WORKER_URL = '/sw.js';
const SERVICE_WORKER_SCOPE = '/';

export function ServiceWorkerRegister() {
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;

        let cancelled = false;

        const registerServiceWorker = async () => {
            try {
                // Reuse the existing root-scope registration when it is already
                // backed by /sw.js. This keeps registration idempotent.
                const existing = await navigator.serviceWorker.getRegistration(SERVICE_WORKER_SCOPE);
                if (cancelled) return;

                if (existing) {
                    const scriptUrl = existing.active?.scriptURL || existing.waiting?.scriptURL || existing.installing?.scriptURL || '';
                    if (scriptUrl === new URL(SERVICE_WORKER_URL, window.location.origin).href) {
                        await existing.update().catch(() => {
                            // Ignore update check errors.
                        });
                        return;
                    }
                }

                // Register /sw.js only when no matching root-scope registration exists.
                await navigator.serviceWorker.register(SERVICE_WORKER_URL, {
                    scope: SERVICE_WORKER_SCOPE,
                });
            } catch {
                // Ignore unsupported browsers and registration failures.
            }
        };

        if (document.readyState === 'complete') {
            void registerServiceWorker();
        } else {
            window.addEventListener('load', registerServiceWorker, { once: true });
        }

        return () => {
            cancelled = true;
            window.removeEventListener('load', registerServiceWorker);
        };
    }, []);

    return null;
}
