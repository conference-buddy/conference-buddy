import { createElement } from "react"

function failOnConsole() {
  const originalConsole = global.console.error
  beforeAll(() => {
    global.console.error = (message: string) => {
      throw Error(message)
    }
  })
  afterAll(() => {
    global.console.error = originalConsole
  })
}

function mockGatsbyImagePlugin() {
  // @TODO look if there's a better solution to handle StaticImage (etc) in tests
  // if not, add to setupAfterEnv
  jest.mock("gatsby-plugin-image", () => {
    const mockImage = ({ ...props }) =>
      createElement("img", {
        ...props,
      })
    return {
      StaticImage: jest.fn().mockImplementation(mockImage),
    }
  })
}

mockGatsbyImagePlugin()
failOnConsole()
