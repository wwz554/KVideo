'use client';

import dynamic from 'next/dynamic';

const PremiumSettingsClient = dynamic(
    () => import('./PremiumSettingsClient'),
    { ssr: false }
);

export default function PremiumSettingsPage() {
    return <PremiumSettingsClient />;
}
