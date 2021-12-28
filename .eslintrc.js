module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "prettier",
    "testing-library",
    "jest-dom",
    "graphql",
    "jsx-a11y",
    "@typescript-eslint",
  ],
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
  },
  overrides: [
    {
      files: ["*.test.{tsx,ts}"],
      extends: ["plugin:testing-library/react", "plugin:jest-dom/recommended"],
      rules: {
        "testing-library/render-result-naming-convention": "off",
        "testing-library/no-dom-import": ["error", "react"],
        "testing-library/no-render-in-setup": "off",
      },
    },
  ],
}
