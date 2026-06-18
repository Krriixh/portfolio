// Kren Industries — app params utility
// Standalone replacement, no external SDK required

const isNode = typeof window === 'undefined';

export const appParams = {
  appId: null,
  token: null,
  fromUrl: isNode ? null : window.location.href,
  functionsVersion: null,
  appBaseUrl: null,
};
