/* eslint @typescript-eslint/explicit-module-boundary-types: "off" */
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import PageLayout from "./src/web/ui-elements/page-layout/PageLayout"
import { AuthUserProvider } from "./src/services/context-provider/AuthUserProvider"

const queryClient = new QueryClient()

export const wrapRootElement = ({ element }) => {
  return (
    <AuthUserProvider>
      <QueryClientProvider client={queryClient}>
        {element}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthUserProvider>
  )
}

export const wrapPageElement = ({ element }) => {
  return <PageLayout>{element}</PageLayout>
}
