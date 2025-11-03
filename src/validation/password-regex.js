export const passwordRegex = [
    {
      regex: /.{8,}/,
      message: "Password must be at least 8 characters long.",
    },
    {
      regex: /[A-Za-z]/,
      message: "Password must contain at least one letter.",
    },
    {
      regex: /\d/,
      message: "Password must contain at least one number.",
    },
    {
      regex: /[@$!%*?&.]/,
      message:
        "Password must contain at least one special character (@$!%*?&).",
    },
  ];