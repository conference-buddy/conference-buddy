import { render, screen, cleanup } from "@testing-library/react"
import { Header } from "./Header"
import { createWrapperWithQueryClient } from "../../../services/test-utils/wrapper"
import { getAuthUser } from "../../../domain/auth-user"
import { getProfile } from "../../../domain/profiles"

// SignIn is tested thoroughly there's no need to test it
// again here, too.
jest.mock("../sign-in/SignIn", () => ({
  SignIn: jest.fn(() => <div data-testid="SignIn" />),
}))

jest.mock("../../../domain/auth-user/api/auth-user-api.ts")
jest.mock("../../../domain/profiles/api/profile-api.ts")

const mockGetAuthUser = getAuthUser as jest.MockedFunction<typeof getAuthUser>
const mockGetProfile = getProfile as jest.MockedFunction<typeof getProfile>

const wrapper = createWrapperWithQueryClient({ withAuthProvider: true })
describe("Header", () => {
  beforeAll(() => {
    mockGetAuthUser.mockResolvedValue(null)
    mockGetProfile.mockResolvedValue(null)
    render(<Header />, { wrapper })
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
