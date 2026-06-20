export const ARCTRACKER_LINK_INVALID_EVENT = 'shiesty:arctracker-link-invalid';

export function notifyArctrackerLinkInvalid(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(ARCTRACKER_LINK_INVALID_EVENT));
}
