/* eslint @typescript-eslint/explicit-module-boundary-types: "off" */
import React from "react"
import { QueryClientProvider, QueryClient } from "react-query"
import { AuthUserProvider } from "./src/services/context-provider/AuthUserProvider"

const queryClient = new QueryClient()

export const wrapRootElement = ({ element }) => {
  return (
    <AuthUserProvider>
      <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
    </AuthUserProvider>
  )
}
