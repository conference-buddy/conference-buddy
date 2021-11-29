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
  // testMatch: ["<rootDir>/src/**/*.test.ts"],
  moduleDirectories: ["node_modules", "src"],
  testURL: `http://localhost`,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
}
