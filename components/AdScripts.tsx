'use client';

import { useEffect } from 'react';

const AD_SCRIPTS = [
  {
    id: 'kvideo-ad-11562042',
    src: 'https://5gvci.com/act/files/tag.min.js?z=11562042',
    async: true,
    cfasync: 'false',
  },
  {
    id: 'kvideo-ad-11565841',
    src: 'https://n6wxm.com/vignette.min.js',
    zone: '11565841',
    async: true,
  },
  {
    id: 'kvideo-ad-11565866',
    src: 'https://nap5k.com/tag.min.js',
    zone: '11565866',
    async: true,
  },
] as const;

export function AdScripts() {
  useEffect(() => {
    const parent = document.body || document.head;
    if (!parent) return;

    for (const ad of AD_SCRIPTS) {
      if (document.getElementById(ad.id)) continue;

      const script = document.createElement('script');
      script.id = ad.id;
      script.src = ad.src;
      script.async = ad.async;

      if ('cfasync' in ad && ad.cfasync !== undefined) {
        script.setAttribute('data-cfasync', ad.cfasync);
      }

      if ('zone' in ad && ad.zone !== undefined) {
        script.dataset.zone = ad.zone;
      }

      parent.appendChild(script);
    }

    return () => {
      // Keep the ad scripts alive across client-side route changes.
    };
  }, []);

  return null;
}
