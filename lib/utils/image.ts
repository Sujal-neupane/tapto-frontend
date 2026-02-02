export const resolveImageUrl = (src?: string | null) => {
  if (!src) {
    console.log("🖼️ No image src provided, using default");
    return "/default-avatar.svg";
  }
  if (src.startsWith("blob:") || src.startsWith("data:") || src.startsWith("http")) {
    console.log("🖼️ Image URL is already absolute:", src);
    return src;
  }

  const normalized = src.replace(/\\/g, "/");
  const uploadsIndex = normalized.lastIndexOf("/uploads/");
  const path = uploadsIndex >= 0
    ? normalized.slice(uploadsIndex)
    : normalized.startsWith("/")
      ? normalized
      : `/${normalized}`;

  // Use relative /uploads path to leverage Next.js rewrite proxy
  if (path.startsWith("/uploads")) {
    console.log("🖼️ Resolved /uploads path:", { original: src, normalized, path, useProxy: true });
    return path;
  }

  console.log("🖼️ Returning relative path:", path);
  return path;
};
