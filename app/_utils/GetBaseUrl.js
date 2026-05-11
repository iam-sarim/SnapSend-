/**
 * Returns the correct base URL for the app:
 * - On Vercel: uses NEXT_PUBLIC_VERCEL_URL (auto-set by Vercel)
 * - Locally: uses NEXT_PUBLIC_BASE_URL from .env.local
 */
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side: use the current browser origin (always correct)
    return window.location.origin;
  }
  // Server-side: use env variables
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  return "http://localhost:3000";
}
