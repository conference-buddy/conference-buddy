/* eslint @typescript-eslint/explicit-module-boundary-types: "off" */
import React from "react"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

const queryClient = new QueryClient()

export const wrapRootElement = ({ element }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        {element}
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    </QueryClientProvider>
  )
}
