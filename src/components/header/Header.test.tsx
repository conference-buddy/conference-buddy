import { render, screen, cleanup, RenderResult } from "@testing-library/react"
import Header from "./Header"

describe("Header", () => {
  let component: RenderResult
  beforeAll(() => {
    component = render(<Header />)
  })

  afterAll(cleanup)

  it("renders the header element", () => {
    const header = screen.getByRole("banner")
    expect(header).toBeVisible()
  })

  it("renders all necessary elements", () => {
    expect(component.asFragment()).toMatchSnapshot()
  })
})
