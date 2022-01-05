import { createElement } from "react"

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
