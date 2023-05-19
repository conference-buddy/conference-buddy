import { cleanup, render, screen } from "@testing-library/react"
import { Claim } from "./Claim"

const headlineAssistiveTechnology = `Let’s make conferences more approachable, welcoming, inclusive, accessible and kind. One Buddy at a time.`
describe("Claim", () => {
  beforeAll(() => {
    render(<Claim />)
  })

  afterAll(cleanup)

  it("shows a headline with text", () => {
    const headline = screen.getByRole("heading", {
      name: headlineAssistiveTechnology,
    })
    expect(headline).toBeVisible()
  })

  it("hides the headline with text visually", () => {
    const headline = screen.getByRole("heading", {
      name: headlineAssistiveTechnology,
    })
    expect(headline).toHaveClass("visually-hidden")
  })

  it("shows the claim animated", () => {
    const claimVisual = screen.getByTestId("claim-animation")

    expect(claimVisual).toBeVisible()
  })

  it("shows a starting text in the animated claim", () => {
    const claimVisual = screen.getByTestId("claim-animation")

    expect(claimVisual).toHaveTextContent(
      `Let’s make conferences more approachable- one Buddy at a time.`
    )
  })

  it("sets the right class for the animation", () => {
    const claimVisual = screen.getByTestId("claim-animation")

    expect(claimVisual).toHaveClass("Claim")
  })

  it("hides the animated claim for assistive technology", () => {
    const claimVisual = screen.getByTestId("claim-animation")

    expect(claimVisual).toHaveAttribute("aria-hidden", "true")
  })
})
