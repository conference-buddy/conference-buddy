import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { ReactElement } from "react"
import { AuthUserProvider } from "../context-provider/AuthUserProvider"

const client = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
})

function createWrapperWithQueryClient({
  withAuthProvider,
}: {
  withAuthProvider?: boolean
}) {
  return ({ children }: { children: ReactElement }) => {
    const withQueryClient = (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    )

    if (withAuthProvider) {
      return <AuthUserProvider>{withQueryClient}</AuthUserProvider>
    } else {
      return withQueryClient
    }
  }
}

export { createWrapperWithQueryClient }
