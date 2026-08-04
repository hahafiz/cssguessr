import { RawColor } from "@cssguessr/shared-types";

type ColorFormat = "rgb" | "hsl" | "rgba" | "hsla";
const SEQUENCE_LENGTH = 10;

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hslToRgb(color: RawColor): [number, number, number] {}
function formatAsHsl(color: RawColor): string {} // uses color directly
function formatAsRgb(color: RawColor): string {} // calls hsltorgb first

function formatColor(color: RawColor, format: ColorFormat): string {
  return {
    hsl: formatAsHsl(color),
    rgb: formatAsRgb(color),
  };
}

function generateRawColorSequence(): RawColor[] {
  const colorSequence = new Array<RawColor>(SEQUENCE_LENGTH);

  for (let i = 0; i < SEQUENCE_LENGTH; i++) {
    const hue = getRandomInt(0, 360);
    const saturation = getRandomInt(0, 100);
    const lightness = getRandomInt(0, 100);

    colorSequence[i] = [hue, saturation, lightness];
  }

  return colorSequence;
}

export function formatColorSequence(
  colors: RawColor[],
  format: ColorFormat,
): string[] {}
