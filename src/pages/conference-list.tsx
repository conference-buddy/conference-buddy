import React from "react"
import { ConferencesListEntry } from "../components/conference/ConferencesListEntry"
import Layout from "../templates/Layout"

export default function ConferenceList() {
  return (
    <Layout title="Conference List">
      <div className="container">
        <ul className="list-group">
          <ConferencesListEntry />
          <ConferencesListEntry />
          <ConferencesListEntry />
        </ul>
      </div>
    </Layout>
  )
}
