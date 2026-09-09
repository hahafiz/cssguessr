import type { RGBColor } from "@cssguessr/shared-types";

export function rgbToHex(color: RGBColor): string {
  const [red, green, blue] = color;
  const hexR: string = red.toString(16).padStart(2, "0");
  const hexG: string = green.toString(16).padStart(2, "0");
  const hexB: string = blue.toString(16).padStart(2, "0");

  return hexR + hexG + hexB;
}
