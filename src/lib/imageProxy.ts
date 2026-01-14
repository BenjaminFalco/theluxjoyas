import type { SyntheticEvent } from "react";

export const getProxyImageUrl = (url: string) =>
  `/api/img?url=${encodeURIComponent(url)}`;

export const isGstaticUrl = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname.includes("gstatic");
  } catch {
    return false;
  }
};

export const getInitialImageUrl = (url?: string) => {
  if (!url) {
    return "/placeholder.svg";
  }
  return isGstaticUrl(url) ? getProxyImageUrl(url) : url;
};

export const handleImageError = (
  event: SyntheticEvent<HTMLImageElement>,
  originalUrl?: string
) => {
  const target = event.currentTarget;
  if (!originalUrl) {
    target.src = "/placeholder.svg";
    return;
  }

  if (!target.dataset.proxyTried) {
    target.dataset.proxyTried = "true";
    target.src = getProxyImageUrl(originalUrl);
    return;
  }

  target.src = "/placeholder.svg";
};
