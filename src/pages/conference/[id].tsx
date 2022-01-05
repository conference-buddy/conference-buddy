import React, { ReactElement } from "react"
import { PageLayout } from "../../ui-elements/page-layout/PageLayout"
import ConferenceSingleTemplate from "../../domain/conference/single/ConferenceSingleTemplate"
import { Conference } from "../../domain/conference/conference-interface"
import useConference from "../../services/hooks/conference/useConference"

export default function Id({
  params,
}: {
  params: Record<string, string>
}): ReactElement | null {
  const id = params.id

  const { data, isLoading, isError } = useConference(id) as {
    data: Conference
    isLoading: boolean
    isError: boolean
  }

  return (
    <PageLayout title="Conference Detail View">
      {isError ? <div>There is no Conference with this ID.</div> : null}
      {!isLoading && !isError ? (
        <ConferenceSingleTemplate conference={data} />
      ) : null}
    </PageLayout>
  )
}
