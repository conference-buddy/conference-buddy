// Pure-JS version of fromEnv.ts for Gatsby
/** @type {import("./fromEnv").fromEnv } */
exports.fromEnv = def => env =>
  Object.entries(def).reduce((res, [defKey, envKey]) => {
    const v = env[envKey]
    if (v === undefined || v.length === 0)
      throw new Error(`${envKey} is not defined in environment!`)
    return { ...res, [defKey]: v }
  }, {})
