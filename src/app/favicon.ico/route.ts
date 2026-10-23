import SearchIcon, { size } from "../icon1";

export const dynamic = "force-static";

/** Serve the sailing mark at the conventional, stable favicon URL. */
export async function GET() {
  const png = new Uint8Array(await SearchIcon().arrayBuffer());
  const icon = new Uint8Array(22 + png.byteLength);
  const header = new DataView(icon.buffer);

  // ICO directory with one PNG image, using the same mark as the PNG icon.
  header.setUint16(2, 1, true);
  header.setUint16(4, 1, true);
  icon[6] = size.width;
  icon[7] = size.height;
  header.setUint16(10, 1, true);
  header.setUint16(12, 32, true);
  header.setUint32(14, png.byteLength, true);
  header.setUint32(18, 22, true);
  icon.set(png, 22);

  return new Response(icon, {
    headers: {
      "Content-Type": "image/x-icon",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
