/**
 * Helper to identify if code is running in the browser, or during compilation of the static files.
 */
export const isSSR = typeof window === "undefined"
