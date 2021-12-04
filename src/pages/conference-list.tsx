import React from "react"
import { ConferencesListEntry } from "../components/conference/ConferencesListEntry"

export default function ConferenceList() {
  return (
    <div className="container">
      <ul className="list-group">
        <ConferencesListEntry />
        <ConferencesListEntry />
        <ConferencesListEntry />
      </ul>
    </div>
  )
}
