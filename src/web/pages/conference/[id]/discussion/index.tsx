import React, { ReactElement } from "react"
import { PageHead } from "../../../../ui-elements/page-layout/PageHead"

export default function Index({
  params,
}: {
  params: Record<string, string>
}): ReactElement | null {
  const id = params.id
  console.log(id)

  return <div className="container">Hello</div>
}

export function Head() {
  return <PageHead title={"Conference details"} />
}
