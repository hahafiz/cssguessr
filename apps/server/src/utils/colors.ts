type ColorFormat = "rgb" | "hsl" | "rgba" | "hsla";
const SEQUENCE_LENGTH = 10;

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateColorSequence(format: ColorFormat = "rgb") {
  const colorSequence = new Array<string>(SEQUENCE_LENGTH);

  for (let i = 0; i < SEQUENCE_LENGTH; i++) {
    const hue = getRandomInt(0, 360);
    const saturation = getRandomInt(0, 100);
    const lightness = getRandomInt(0, 100);

    const color: string = `${hue} ${saturation} ${lightness}`;
    colorSequence[i] = color;
  }

  return colorSequence;
}
