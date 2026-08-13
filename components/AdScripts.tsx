'use client';

import { useEffect } from 'react';

type AdcashGlobal = {
  runVideoSlider?: (options: { zoneId: string }) => void;
  runInPagePush?: (options: { zoneId: string; maxAds: number }) => void;
};

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

    // 2. n6wxm.com
    if (!document.querySelector('script[data-zone="11565841"]')) {
      const script = document.createElement('script');
      script.src = 'https://n6wxm.com/vignette.min.js';
      script.dataset.zone = '11565841';
      parent.appendChild(script);
    }

    // 3. EffectiveCPM
    if (!document.querySelector('script[src="https://pl30796899.effectivecpmnetwork.com/78/23/dd/7823dd9ea490e56b5d807adc2eb11bb4.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://pl30796899.effectivecpmnetwork.com/78/23/dd/7823dd9ea490e56b5d807adc2eb11bb4.js';
      parent.appendChild(script);
    }

    // 4. Adcash: load aclib.js first, then run the advertiser-supplied VideoSlider and InPagePush calls.
    const runAdcashAds = () => {
      const aclib = (window as Window & { aclib?: AdcashGlobal }).aclib;
      if (!aclib) return;

      if (typeof aclib.runVideoSlider === 'function') {
        aclib.runVideoSlider({
          zoneId: '11959758',
        });
      }

      if (typeof aclib.runInPagePush === 'function') {
        aclib.runInPagePush({
          zoneId: '11959726',
          maxAds: 2,
        });
      }
    };

    const existingAdcash = document.querySelector<HTMLScriptElement>(
      'script[src*="acscdn.com/script/aclib.js"]'
    );

    if (existingAdcash) {
      if ((window as Window & { aclib?: AdcashGlobal }).aclib) {
        runAdcashAds();
      } else {
        existingAdcash.addEventListener('load', runAdcashAds, { once: true });
      }
    } else {
      const script = document.createElement('script');
      script.id = 'aclib';
      script.type = 'text/javascript';
      script.src = 'https://acscdn.com/script/aclib.js';
      script.addEventListener('load', runAdcashAds, { once: true });
      parent.appendChild(script);
    }
  }, []);

  return null;
}
