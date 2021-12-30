import React, { ReactElement } from "react"
import { Layout } from "../components/layout/Layout"
import ConferenceTemplate from "../components/conference/ConferenceTemplate"
import { Conference } from "../domain/conference/conference-interface"
import useConference from "../hooks/useConference"

export default function Id({ params }: { params: any }): ReactElement | null {
  const id = params.id
  console.log(id)

  const { data, isLoading, isError } = useConference(id) as {
    data: Conference
    isLoading: boolean
    isError: boolean
  }
  if (!id) return null
  return (
    <Layout title="Conference Detail View">
      {isError ? <div>This is error</div> : null}
      {!isLoading && !isError ? <ConferenceTemplate {...data} /> : null}
    </Layout>
  )
}
