export default {
  name: "isEmailOrNationalId",
  skipAbsent: true,
  test(value, ctx) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const numberOnlyRegex = /^[0-9]+$/;

    const isValidNationalID = () => {
      const parsedValue = parseInt(value);
      return parsedValue >= 100000 && parsedValue <= 50000000;
    };

    const invalidIDMsg = "National ID must be a valid ID number";
    const invalidEmailMsg = "Email must be a valid email";

    if (emailRegex.test(value)) return true;
    else {
      if (numberOnlyRegex.test(value)) {
        if (isValidNationalID()) return true;
        else return ctx.createError({ message: invalidIDMsg });
      } else return ctx.createError({ message: invalidEmailMsg });
    }
  },
};
