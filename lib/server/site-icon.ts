// The public site branding is fixed to 拼好剧.
// Deployment environment variables are intentionally ignored here so that
// SITE_ICON_* values cannot replace the site's logo unexpectedly.
export const DEFAULT_SITE_ICON_PATH = '/pinhaoju-icon.svg';

export async function resolveSiteIconSrc(): Promise<string> {
  return DEFAULT_SITE_ICON_PATH;
}
