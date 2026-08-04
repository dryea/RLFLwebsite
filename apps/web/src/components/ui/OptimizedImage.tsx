import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  fit?: "cover" | "contain" | "scale-down";
}

/**
 * Image that uses Cloudflare Image Resizing (cdn-cgi/image) for automatic
 * optimization (WebP/AVIF, width scaling) with proper dimensions to prevent CLS.
 * Falls back to the raw URL if already optimized or if not on the CF domain.
 */
export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 450,
  className,
  sizes = "100vw",
  loading = "lazy",
  priority,
  fit = "cover",
}: OptimizedImageProps) {
  const canResize =
    typeof src === "string" &&
    (src.startsWith("https://rfil-api.sudeepdhakal.workers.dev/api/media") ||
      src.startsWith("/assets/"));

  let optimizedSrc = src;
  if (canResize) {
    const base = src.startsWith("/") ? `https://rfil-web.sudeepdhakal.workers.dev${src}` : src;
    optimizedSrc = `https://rfil-web.sudeepdhakal.workers.dev/cdn-cgi/image/width=${width},height=${height},fit=${fit},quality=80,format=auto/${encodeURIComponent(base)}`;
  }

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : loading}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={cn("object-cover", className)}
      sizes={sizes}
    />
  );
}
