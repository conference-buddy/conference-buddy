/* eslint @typescript-eslint/explicit-module-boundary-types: "off" */
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import PageLayout from "./src/web/ui-elements/page-layout/PageLayout"
import { AuthUserProvider } from "./src/services/context-provider/AuthUserProvider"

const queryClient = new QueryClient({
  retry: false,
  // Since we're in mostly development mode right now.
  // refetching on windows focus is not needed
  refetchOnWindowFocus: false,
  // globale stale time 60 seconds,
  // queries will go stale after and
  // ready to be refetched
  staleTime: 60 * 1000,
})

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
