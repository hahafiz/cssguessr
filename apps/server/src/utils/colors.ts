import { RawColor, ColorFormat } from "@cssguessr/shared-types";

export const SEQUENCE_LENGTH = 10;

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRawColorSequence(): RawColor[] {
  const colorSequence = new Array<RawColor>(SEQUENCE_LENGTH);

  for (let i = 0; i < SEQUENCE_LENGTH; i++) {
    const hue = getRandomInt(0, 359);
    const saturation = getRandomInt(0, 100);
    const lightness = getRandomInt(0, 100);

    colorSequence[i] = [hue, saturation, lightness];
  }

  return colorSequence;
}

function hslToRgb(color: RawColor): [number, number, number] {
  const [hue, saturation, lightness] = color;
  const h = Math.floor(hue / 60);
  const s = saturation / 100;
  const l = lightness / 100;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = l - chroma / 2; // brightness

  let r, g, b;
  switch (h) {
    case 0:
      r = chroma;
      g = x;
      b = 0;
      break;
    case 1:
      r = x;
      g = chroma;
      b = 0;
      break;
    case 2:
      r = 0;
      g = chroma;
      b = x;
      break;
    case 3:
      r = 0;
      g = x;
      b = chroma;
      break;
    case 4:
      r = x;
      g = 0;
      b = chroma;
      break;
    case 5:
      r = chroma;
      g = 0;
      b = x;
      break;
    default:
      throw new Error(`Invalid hue sector: h=${h} from hue=${hue}`);
  }

  let red: number = Math.round((r + m) * 255);
  let green: number = Math.round((g + m) * 255);
  let blue: number = Math.round((b + m) * 255);

  return [red, green, blue];
}

function formatAsHsl(color: RawColor): string {
  const [h, s, l] = color;

  return `hsl(${h}, ${s}%, ${l}%)`;
}

function formatAsRgb(color: RawColor): string {
  const [r, g, b] = hslToRgb(color);

  return `rgb(${r}, ${g}, ${b})`;
}

function formatColor(color: RawColor, format: ColorFormat): string {
  switch (format) {
    case "rgb":
    case "rgba":
      return formatAsRgb(color);
    case "hsl":
    case "hsla":
      return formatAsHsl(color);
    default:
      throw new Error(`Unknown color format!`);
  }
}

export function formatColorSequence(
  colors: RawColor[],
  format: ColorFormat,
): string[] {
  const colorSequence = colors.map((c) => formatColor(c, format));

  return colorSequence;
}
