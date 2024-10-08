module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["standard", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    semi: "off",
    quotes: "off",
    "comma-dangle": "off",
    "space-before-function-paren": "off",
    "multiline-ternary": "off",
  },
};
