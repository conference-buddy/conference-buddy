module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["testing-library", "jest-dom"],
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
