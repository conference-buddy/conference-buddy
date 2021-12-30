export const fromEnv =
  <T extends Record<string, string>>(def: T) =>
  (env: NodeJS.ProcessEnv): Record<keyof T, string> =>
    Object.entries(def).reduce((res, [defKey, envKey]) => {
      const v = env[envKey]
      if (v === undefined || v.length === 0)
        throw new Error(`${envKey} is not defined in environment!`)
      return { ...res, [defKey]: v }
    }, {} as Record<keyof T, string>)
