import * as React from "react"
import type { PageProps } from "gatsby"
import { PageHead } from "../ui-elements/page-layout/PageHead"

export function Head() {
  return (
    <div>
      <PageHead title={"Welcome"} />
    </div>
  )
}

const IndexPage: React.FC<PageProps> = () => {
  return <h1>Henlo!!</h1>
}

export default IndexPage
