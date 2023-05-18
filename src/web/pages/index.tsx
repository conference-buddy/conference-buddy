import * as React from "react"
import type { PageProps } from "gatsby"
import { PageLayout } from "../layout/PageLayout"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <PageLayout>
      <h1>Henlo!!</h1>
    </PageLayout>
  )
}

export default IndexPage
export { Head } from "../layout/PageLayout"
