import { fromEnv } from "./fromEnv"

describe("fromEnv()", () => {
  it("should return environment variables if defined", () => {
    const env = { FOO: "bar" }
    expect(fromEnv({ foo: "FOO" })(env)).toEqual({ foo: "bar" })
  })
  it("should throw an error if the environment variable is not defined", () => {
    const env = {}
    expect(() => fromEnv({ foo: "FOO" })(env)).toThrow(
      "FOO is not defined in environment!"
    )
  })
})
