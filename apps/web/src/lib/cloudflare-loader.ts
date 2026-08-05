interface LoaderParams {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Cloudflare Images loader for next/image.
 * Resizes + optimizes (WebP/AVIF) via the Cloudflare image resizing endpoint.
 */
export default function cloudflareLoader({ src, width, quality }: LoaderParams): string {
  const base =
    src.startsWith("http") || src.startsWith("//")
      ? src
      : `https://rfil-web.sudeepdhakal.workers.dev${src}`;
  return `https://rfil-web.sudeepdhakal.workers.dev/cdn-cgi/image/width=${width},quality=${quality || 75},format=auto/${encodeURIComponent(base)}`;
}
