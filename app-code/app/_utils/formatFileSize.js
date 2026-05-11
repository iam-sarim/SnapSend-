/**
 * Formats a byte count into a human-readable string.
 * - Under 1 MB  → shown in KB  (e.g. 499 KB)
 * - 1 MB and up → shown in MB  (e.g. 1.2 MB)
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return "0 KB";
  if (bytes < 1024 * 1024) {
    return Math.round(bytes / 1024) + " KB";
  }
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
