import { cleanup, render, screen } from "@testing-library/react"
import PageNotFound from "./index"

describe("PageNotFound", () => {
  beforeAll(() => {
    render(<PageNotFound />)
  })

  afterAll(cleanup)

  it("shows a 404 page", () => {
    const title = screen.getByRole("heading", { name: "Page not found" })
    expect(title).toBeVisible()
  })

  it("shows link to go back to startpage", () => {
    const link = screen.getByRole("link", { name: "Go to startpage" })
    expect(link).toBeVisible()
  })
})
