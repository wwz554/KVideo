'use client';

import { createContext, useContext } from 'react';

const SiteIconContext = createContext('/pinhaoju-icon.svg');

export function SiteIconProvider({
  children,
  iconSrc,
}: {
  children: React.ReactNode;
  iconSrc: string;
}) {
  return <SiteIconContext.Provider value={iconSrc}>{children}</SiteIconContext.Provider>;
}

export function useSiteIcon() {
  return useContext(SiteIconContext);
}
