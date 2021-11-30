// enables our custom setup and teardown for rendering vue components
// see: https://gitlab.com/ryter/ryter/-/blob/master/documentation/frontend/testing/03_tools-and-setup/in-depth/custom-cleanup.adoc#user-content-our-setup-and-teardown-explained
process.env.VTL_SKIP_AUTO_CLEANUP = "true"

module.exports = {
  rootDir: ".",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
    __PATH_PREFIX__: ``,
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootdir>/node_modules/"],
  setupFiles: [`<rootDir>/tests/setup/loadershim.js`],
  setupFilesAfterEnv: ["<rootDir>/tests/setup/setup-after-env.ts"],
  testMatch: ["<rootDir>/src/**/*.test.ts(x)"],
  moduleDirectories: ["node_modules", "src"],
  testURL: `http://localhost`,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
}
