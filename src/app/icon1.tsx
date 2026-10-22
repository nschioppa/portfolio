import { ImageResponse } from "next/og";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

/** A raster version of the site's sailing mark for search results. */
export default function SearchIcon() {
  return new ImageResponse(
    (
      <svg width="96" height="96" viewBox="0 0 40 40">
        <rect width="40" height="40" rx="10" fill="#15343d" />
        <path d="M20 6v23H8L20 6Zm3 7 10 16H23V13Z" fill="#f7f5ef" />
        <path d="M7 32h27l-5 4H12L7 32Z" fill="#99d0c9" />
      </svg>
    ),
    size,
  );
}
