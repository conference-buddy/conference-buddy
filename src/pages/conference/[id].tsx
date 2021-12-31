import React, { ReactElement } from "react"
import { Layout } from "../../components/layout/Layout"
import ConferenceTemplate from "../../components/conference/ConferenceTemplate"
import { Conference } from "../../domain/conference/conference-interface"
import useConference from "../../hooks/useConference"

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
    <Layout title="Conference Detail View">
      {isError ? <div>There is no Conference with this ID</div> : null}
      {!isLoading && !isError ? <ConferenceTemplate conference={data} /> : null}
    </Layout>
  )
}
