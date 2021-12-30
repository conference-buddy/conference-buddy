import React, { ReactElement } from "react"
import { ConferencesListEntry } from "../components/conference/ConferencesListEntry"
import { Layout } from "../components/layout/Layout"

import { Conference } from "../domain/conference/conference-interface"
import useConferences from "../hooks/useConferences"

export default function ConferenceList(): ReactElement {
  const { data: conferences, isLoading } = useConferences() as {
    data: Conference[]
    isLoading: boolean
  }

  const listItem = conferences?.map((conference: Conference, index: number) => {
    return <ConferencesListEntry key={index} conference={conference} />
  })

  if (isLoading) {
    return <div>LOADING</div>
  }

  return (
    <Layout title="Conference List">
      <div className="container">
        <ul className="list-group">{listItem}</ul>
      </div>
    </Layout>
  )
}
