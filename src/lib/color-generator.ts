// random color generation logic
export const generateRandomHex = () => {
  const randomColor =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0"); // ensure color is 6 characters long

  return randomColor;
};
