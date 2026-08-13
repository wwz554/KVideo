'use client';

import { useEffect } from 'react';

export function AdScripts() {
  useEffect(() => {
    const parent = [document.documentElement, document.body].filter(Boolean).pop();
    if (!parent) return;

    // 1. Original advertiser loader, kept as close to the supplied code as possible.
    if (!document.querySelector('script[data-zone="11565866"]')) {
      ((s) => {
        s.dataset.zone = '11565866';
        s.src = 'https://nap5k.com/tag.min.js';
      })(parent.appendChild(document.createElement('script')));
    }

    // 2. Original advertiser loader, kept as close to the supplied code as possible.
    if (!document.querySelector('script[data-zone="11565841"]')) {
      ((s) => {
        s.dataset.zone = '11565841';
        s.src = 'https://n6wxm.com/vignette.min.js';
      })(parent.appendChild(document.createElement('script')));
    }

    // 3. Original external script tag.
    if (!document.querySelector('script[src*="5gvci.com/act/files/tag.min.js?z=11562042"]')) {
      const script = document.createElement('script');
      script.src = 'https://5gvci.com/act/files/tag.min.js?z=11562042';
      script.setAttribute('data-cfasync', 'false');
      script.async = true;
      parent.appendChild(script);
    }

    // 4. EffectiveCPM external script tag.
    if (!document.querySelector('script[src="https://pl30796899.effectivecpmnetwork.com/78/23/dd/7823dd9ea490e56b5d807adc2eb11bb4.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://pl30796899.effectivecpmnetwork.com/78/23/dd/7823dd9ea490e56b5d807adc2eb11bb4.js';
      parent.appendChild(script);
    }
  }, []);

  return null;
}
