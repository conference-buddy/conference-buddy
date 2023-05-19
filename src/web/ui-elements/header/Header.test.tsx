import { render, screen, cleanup } from "@testing-library/react"
import { Header } from "./Header"

// SignIn is tested thoroughly there's no need to test it
// again here, too.
jest.mock("../sign-in/SignIn", () => ({
  SignIn: jest.fn(() => <div data-testid="SignIn" />),
}))

jest.mock("@supabase/supabase-js")
jest.mock("../../../domain/profiles/api/profile-api.ts")

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

  it("renders the SignIn component", () => {
    const signIn = screen.getByTestId("SignIn")

    expect(signIn).toBeVisible()
  })
})
