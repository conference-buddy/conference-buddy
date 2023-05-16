/* eslint @typescript-eslint/explicit-module-boundary-types: "off" */
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export const wrapRootElement = ({ element }) => {
  return (
    <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
  )
}
