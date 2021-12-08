import { render, screen, cleanup, RenderResult } from "@testing-library/react"
import Footer from "./Footer"

describe("Footer", () => {
  let component: RenderResult
  beforeAll(() => {
    component = render(<Footer />)
  })

  afterAll(cleanup)

  it("renders a footer element", () => {
    const footer = screen.getByRole("contentinfo")
    expect(footer).toBeVisible()
  })

  it("renders a link to privacy policy", () => {
    const link = screen.getByRole("link", {
      name: "Privacy Policy",
    })
    expect(link).toBeVisible()
  })

  it("renders all necessary elements", () => {
    expect(component.asFragment()).toMatchSnapshot()
  })
})
