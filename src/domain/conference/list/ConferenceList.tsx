import React, { ReactElement } from "react"
import { Conference } from "../conference-interface"
import { ConferencesListEntry } from "./entry/ConferencesListEntry"

function ConferenceList({
  conferences,
}: {
  conferences: Conference[]
}): ReactElement {
  const listItem = conferences.map((conference: Conference, index: number) => {
    return <ConferencesListEntry key={index} conference={conference} />
  })

  return (
    <div className="container">
      <ul className="list-group">{listItem}</ul>
    </div>
  )
}

export { ConferenceList }
