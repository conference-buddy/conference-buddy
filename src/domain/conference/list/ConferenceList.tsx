import React, { ReactElement } from "react"
import { Conference } from "../conference-interface"
import { ConferencesListEntry } from "./entry/ConferencesListEntry"

type ConferenceListProps = {
  conferences: Conference[]
}

function ConferenceList({ conferences }: ConferenceListProps): ReactElement {
  const listItem = conferences.map((conference: Conference, index: number) => {
    return <ConferencesListEntry key={index} conference={conference} />
  })

  return <ul className="list-group">{listItem}</ul>
}

export { ConferenceList }
