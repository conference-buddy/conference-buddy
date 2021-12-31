import React, { ReactElement } from "react"
import { Conference } from "../../domain/conference/conference-interface"

function ConferenceTemplate({
  conference,
}: {
  conference: Conference
}): ReactElement {
  return (
    <div>
      <h1>Conference Page</h1>
      <h2>{conference.name}</h2>
    </div>
  )
}

export default ConferenceTemplate
