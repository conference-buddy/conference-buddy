import { cleanup, render, screen } from "@testing-library/react"
import React from "react"
import { SignIn } from "./SignIn"
import { getAuthUser } from "../../../domain/auth-user"
import { User } from "@supabase/gotrue-js/src/lib/types"
import { createWrapperWithQueryClient } from "../../../services/test-utils/wrapper"
import { getProfile, Profile } from "../../../domain/profiles"
import userEvent from "@testing-library/user-event"
import {
  signInWithGithub,
  signOut,
} from "../../../domain/auth-user/api/auth-user-api"

jest.mock("@supabase/supabase-js")

jest.mock("../../../domain/auth-user/api/auth-user-api.ts")
jest.mock("../../../domain/profiles/api/profile-api.ts")

const mockGetAuthUser = getAuthUser as jest.MockedFunction<typeof getAuthUser>
const mockSignInWithGithub = signInWithGithub as jest.MockedFunction<
  typeof signInWithGithub
>
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>
const mockGetProfile = getProfile as jest.MockedFunction<typeof getProfile>

const wrapper = createWrapperWithQueryClient({ withAuthProvider: true })
describe("SignIn", () => {
  const user = userEvent.setup()

  describe("if user is not authenticated", () => {
    beforeEach(() => {
      mockSignInWithGithub.mockResolvedValue({
        data: {
          provider: "github",
          url: "",
        },
        error: null,
      })
      mockGetAuthUser.mockResolvedValue(null)
      mockGetProfile.mockResolvedValue(null)
      render(<SignIn />, { wrapper })
    })

    afterEach(() => {
      cleanup()
      jest.resetAllMocks()
    })

    it("shows a button to sign in", () => {
      const button = screen.getByRole("button", { name: "Sign in" })

      expect(button).toBeEnabled()
    })

    it("shows no button to sign out", () => {
      const button = screen.queryByRole("button", { name: "Sign out" })

      expect(button).not.toBeInTheDocument()
    })

    it("redirects user to authenticate with github as provider", async () => {
      const button = screen.getByRole("button", { name: "Sign in" })

      await user.click(button)
      expect(mockSignInWithGithub).toHaveBeenCalledTimes(1)
    })
  })

  describe("if user is authenticated", () => {
    describe("enables user to sign out if they are logged in", () => {
      beforeEach(() => {
        mockSignOut.mockResolvedValue()
        mockGetAuthUser.mockResolvedValue({ id: "" } as User)
        mockGetProfile.mockResolvedValue(null)
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

  describe("if authenticated user does not have a profile yet", () => {
    beforeAll(() => {
      mockGetAuthUser.mockResolvedValue({ id: "" } as User)
      mockGetProfile.mockResolvedValue(null)
      render(<SignIn />, { wrapper })
    })

    afterAll(() => {
      cleanup()
      jest.resetAllMocks()
    })

    it("shows a link to create a profile", async () => {
      const link = await screen.findByRole("link", { name: "Create profile" })

      expect(link).toBeVisible()
      expect(link).toHaveAttribute("href", "/profile/create")
    })

    it("does not show a link to a user profile", async () => {
      await screen.findByRole("link", { name: "Create profile" })
      const link = screen.queryByRole("link", { name: "Profile" })

      expect(link).not.toBeInTheDocument()
    })
  })

  describe("if authenticated user has a profile", () => {
    beforeAll(() => {
      mockGetAuthUser.mockResolvedValue({ id: "" } as User)
      mockGetProfile.mockResolvedValue({ id: " " } as Profile)
      render(<SignIn />, { wrapper })
    })

    afterAll(() => {
      cleanup()
      jest.resetAllMocks()
    })

    it("shows a link to users profile", async () => {
      const link = await screen.findByRole("link", { name: "Profile" })

      expect(link).toBeVisible()
      expect(link).toHaveAttribute("href", "/profile")
    })

    it("does not show a link to create a profile", async () => {
      await screen.findByRole("link", { name: "Profile" })
      const link = screen.queryByRole("link", { name: "Create profile" })

      expect(link).not.toBeInTheDocument()
    })
  })
})
