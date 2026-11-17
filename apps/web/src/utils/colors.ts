import type { RGBColor } from "@cssguessr/shared-types";

export function rgbToHex(color: RGBColor): string {
  const [red, green, blue] = color;
  const hexR: string = red.toString(16).padStart(2, "0");
  const hexG: string = green.toString(16).padStart(2, "0");
  const hexB: string = blue.toString(16).padStart(2, "0");

  return hexR + hexG + hexB;
}

function channelToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function getRelativeLuminance([red, green, blue]: RGBColor): number {
  return (
    0.2126 * channelToLinear(red) +
    0.7152 * channelToLinear(green) +
    0.0722 * channelToLinear(blue)
  );
}
