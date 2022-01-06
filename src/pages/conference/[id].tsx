import React, { ReactElement } from "react"
import { WrapperLayout } from "../../page-templates/wrapper-layout/WrapperLayout"
import { ConferenceSinglePageTemplate } from "../../page-templates/conference-single/ConferenceSinglePageTemplate"
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
    <WrapperLayout title="Conference Detail View">
      {isError ? <div>There is no Conference with this ID.</div> : null}
      {!isLoading && !isError ? (
        <ConferenceSinglePageTemplate conference={data} />
      ) : null}
    </WrapperLayout>
  )
}
