export const generateRandomString = () => {
  const characters =
    "ABCDEFGHIJKLMOPQRSTUVWXYZkljslkdmgklsjiosdryqwpdkn12345678910";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
