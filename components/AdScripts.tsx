'use client';

import { useEffect } from 'react';

export function AdScripts() {
  useEffect(() => {
    const parent = document.body;
    if (!parent) return;

    // 1. nap5k.com
    if (!document.querySelector('script[data-zone="11565866"]')) {
      const script = document.createElement('script');
      script.src = 'https://nap5k.com/tag.min.js';
      script.dataset.zone = '11565866';
      parent.appendChild(script);
    }

    // 3. EffectiveCPM
    if (!document.querySelector('script[src="https://pl30796899.effectivecpmnetwork.com/78/23/dd/7823dd9ea490e56b5d807adc2eb11bb4.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://pl30796899.effectivecpmnetwork.com/78/23/dd/7823dd9ea490e56b5d807adc2eb11bb4.js';
      parent.appendChild(script);
    }
  }, []);

  return null;
}
