import React, { ReactElement } from "react"
import { PageLayout } from "../../ui-elements/page-layout/PageLayout"

export default function Username({
  params,
}: {
  params: Record<string, string>
}): ReactElement | null {
  const username = params.username
  return (
    <PageLayout title="Conference Detail View">
      <h1>this is dynamic user</h1>
      <h2>{username}</h2>
    </PageLayout>
  )
}
