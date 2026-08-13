'use client';

import { useEffect } from 'react';

type AdcashGlobal = {
  runAutoTag?: (options: { zoneId: string }) => void;
};

export function AdScripts() {
  useEffect(() => {
    const parent = document.body;
    if (!parent) return;

    // 1. nap5k.com — same loader behavior as the advertiser code.
    if (!document.querySelector('script[data-zone="11565866"]')) {
      const script = document.createElement('script');
      script.src = 'https://nap5k.com/tag.min.js';
      script.dataset.zone = '11565866';
      parent.appendChild(script);
    }

    // 2. n6wxm.com — same loader behavior as the advertiser code.
    if (!document.querySelector('script[data-zone="11565841"]')) {
      const script = document.createElement('script');
      script.src = 'https://n6wxm.com/vignette.min.js';
      script.dataset.zone = '11565841';
      parent.appendChild(script);
    }

    // 4. EffectiveCPM — original external script URL preserved.
    if (!document.querySelector('script[src="https://pl30796899.effectivecpmnetwork.com/78/23/dd/7823dd9ea490e56b5d807adc2eb11bb4.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://pl30796899.effectivecpmnetwork.com/78/23/dd/7823dd9ea490e56b5d807adc2eb11bb4.js';
      parent.appendChild(script);
    }

    // 5. Adcash AutoTag — load the library first, then run the supplied zone call.
    const runAdcashAutoTag = () => {
      const aclib = (window as Window & { aclib?: AdcashGlobal }).aclib;
      if (aclib && typeof aclib.runAutoTag === 'function') {
        aclib.runAutoTag({ zoneId: 'wnllwn4uty' });
      }
    };

    const existingAdcash = document.querySelector<HTMLScriptElement>(
      'script[src*="acscdn.com/script/aclib.js"]'
    );

    if (existingAdcash) {
      if (existingAdcash.dataset.aclibInitialized !== 'true') {
        existingAdcash.addEventListener('load', runAdcashAutoTag, { once: true });
        if ((window as Window & { aclib?: AdcashGlobal }).aclib?.runAutoTag) {
          runAdcashAutoTag();
        }
        existingAdcash.dataset.aclibInitialized = 'true';
      }
    } else {
      const script = document.createElement('script');
      script.id = 'aclib';
      script.type = 'text/javascript';
      script.src = 'https://acscdn.com/script/aclib.js';
      script.addEventListener('load', runAdcashAutoTag, { once: true });
      parent.appendChild(script);
    }
  }, []);

  return null;
}
