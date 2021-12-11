module.exports = {
  plugins: ["prettier", "testing-library", "jest-dom", "graphql", "jsx-a11y"],
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
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
