import { render, screen, cleanup } from "@testing-library/react"
import { Header } from "./Header"

describe("Header", () => {
  beforeAll(() => {
    render(<Header />)
  })

  afterAll(cleanup)

  it("renders the header element", () => {
    const header = screen.getByRole("banner")
    expect(header).toBeVisible()
  })

  it("shows a link back to start page", () => {
    const linkText = screen.getByRole("link", { name: "Start page" })

    expect(linkText).toBeVisible()
  })
})
