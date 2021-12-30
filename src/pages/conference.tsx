import React, { ReactElement } from "react"
import { Layout } from "../components/layout/Layout"
import { HistoryLocation } from "@reach/router"
import ConferenceTemplate from "../components/conference/ConferenceTemplate"

export default function Conference({
  location,
}: {
  location: HistoryLocation
}): ReactElement | null {
  const id = location.state.id
  console.log(id)
  if (!id) return null
  return (
    <Layout title="Conference Detail View">
      <ConferenceTemplate id={id} />
    </Layout>
  )
}
