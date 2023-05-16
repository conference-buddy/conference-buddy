// enables our custom setup and teardown for rendering vue components
// see: https://gitlab.com/ryter/ryter/-/blob/master/documentation/frontend/testing/03_tools-and-setup/in-depth/custom-cleanup.adoc#user-content-our-setup-and-teardown-explained
process.env.RTL_SKIP_AUTO_CLEANUP = "true"

module.exports = {
    rootDir: ".",
    globals: {
        __PATH_PREFIX__: ``,
    },
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {
            tsconfig: "./tsconfig.test.json",
        }],
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
            "jest-transform-stub",
    },
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
    },
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["<rootdir>/node_modules/"],
    setupFiles: [`<rootDir>/test-setup/loadershim.js`],
    setupFilesAfterEnv: [
        "<rootDir>/test-setup/setup-files.ts",
        "<rootDir>/test-setup/setup-after-env.ts",
    ],
    testMatch: ["<rootDir>/src/**/*.test.{js,jsx,ts,tsx}"],
    moduleDirectories: ["node_modules", "src"],
    testEnvironmentOptions: {url: `http://localhost`},
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
}
