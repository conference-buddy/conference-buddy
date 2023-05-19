import { cleanup, render, screen } from "@testing-library/react"
import React, { ReactElement } from "react"
import { SignIn } from "./SignIn"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { getAuthUser } from "../../../domain/auth-user"
import { User } from "@supabase/gotrue-js/src/lib/types"
import { AuthUserProvider } from "../../../services/context-provider/AuthUserProvider"

jest.mock("@supabase/supabase-js")

jest.mock("../../../domain/auth-user/api/auth-user-api.ts")

const mockGetAuthUser = getAuthUser as jest.MockedFunction<typeof getAuthUser>

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
})
const wrapper = ({ children }: { children: ReactElement }) => (
  <AuthUserProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </AuthUserProvider>
)
describe("SignIn", () => {
  describe("enables user to sign in if they are not authenticated", () => {
    beforeAll(() => {
      mockGetAuthUser.mockResolvedValue(null)
      render(<SignIn />, { wrapper })
    })

    afterAll(() => {
      cleanup()
      jest.resetAllMocks()
    })

    it("shows a button to sign in", () => {
      const button = screen.getByRole("button", { name: "Sign in" })

      expect(button).toBeEnabled()
    })
  })

  describe("enables user to sign out if they are logged in", () => {
    beforeAll(() => {
      mockGetAuthUser.mockResolvedValue({ id: "" } as User)
      render(<SignIn />, { wrapper })
    })

    afterAll(() => {
      cleanup()
      jest.resetAllMocks()
    })

    it("shows a button to sign out", async () => {
      const button = await screen.findByRole("button", { name: "Sign out" })

      expect(button).toBeEnabled()
    })
  })
})
