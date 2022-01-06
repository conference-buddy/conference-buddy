import React, { ReactElement } from "react"
import { Conference } from "../../domain/conference/conference-interface"
import { ConferenceList } from "../../domain/conference/list/ConferenceList"

type ConferenceListProps = {
  conferences: Conference[]
}

function ConferenceListPageTemplate({
  conferences,
}: ConferenceListProps): ReactElement {
  return (
    <div className="container">
      <h1>Conference List</h1>
      <p>
        If you want to be a Conference Buddy at one of these conferences, click
        the button 🐶 and leave a comment! You are not sure you want to be one,
        but you want to keep updated? Be a Lurker 👀 and get notifications.
      </p>
      <ConferenceList conferences={conferences} />
    </div>
  )
}

export { ConferenceListPageTemplate }
