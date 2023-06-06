import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import React from "react"
import { SignIn } from "./SignIn"
import { getAuthUser } from "../../../domain/auth-user"
import { createWrapperWithQueryClient } from "../../../services/test-utils/wrapper"
import userEvent from "@testing-library/user-event"
import {
  signInWithProvider,
  signOut,
} from "../../../domain/auth-user/api/auth-user-api"
import { User } from "@supabase/supabase-js"

jest.mock("../../../domain/auth-user/api/auth-user-api.ts")

const mockGetAuthUser = getAuthUser as jest.MockedFunction<typeof getAuthUser>
const mockSignInWithProvider = signInWithProvider as jest.MockedFunction<
  typeof signInWithProvider
>
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>

const wrapper = createWrapperWithQueryClient({ withAuthProvider: true })
describe("SignIn", () => {
  const user = userEvent.setup()

  describe("if user is not authenticated", () => {
    beforeEach(async () => {
      mockSignInWithProvider.mockResolvedValue({
        data: {
          provider: "github",
          url: "",
        },
        error: null,
      })
      mockGetAuthUser.mockResolvedValue(null)
      render(<SignIn />, { wrapper })

      await waitForElementToBeRemoved(
        screen.queryByText("Loading authentication status")
      )
    })

    afterEach(() => {
      cleanup()
      jest.resetAllMocks()
    })

    it("shows a link to sign in", () => {
      const link = screen.getByRole("link", { name: "Sign in" })

      expect(link).toBeVisible()
      expect(link).toHaveAttribute("href", "/signin")
    })

    it("shows no button to sign out", () => {
      const button = screen.queryByRole("button", { name: "Sign out" })

      expect(button).not.toBeInTheDocument()
    })
  })

  describe("if user is authenticated", () => {
    beforeEach(() => {
      mockSignOut.mockResolvedValue()
      mockGetAuthUser.mockResolvedValue({ id: "" } as User)
      render(<SignIn />, { wrapper })
    })

    afterEach(() => {
      cleanup()
      jest.resetAllMocks()
    })

    it("shows a button to sign out", async () => {
      const button = await screen.findByRole("button", { name: "Sign out" })

      expect(button).toBeEnabled()
    })

    it("shows no button to sign in as soon as authentication is confirmed", async () => {
      await screen.findByRole("button", { name: "Sign out" })
      const button = screen.queryByRole("button", { name: "Sign in" })

      expect(button).not.toBeInTheDocument()
    })

    it("logs user out if they click the button", async () => {
      const button = await screen.findByRole("button", { name: "Sign out" })

      await user.click(button)
      expect(mockSignOut).toHaveBeenCalledTimes(1)
    })
  })
})
