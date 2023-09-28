export const extractNumber = (text) => {
  const phoneRegex = /phone:(\d+)/;

  const match = text?.match(phoneRegex);
  if (match) {
    return match[1];
  }
  return null;
};
