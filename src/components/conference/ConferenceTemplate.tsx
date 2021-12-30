import React, { ReactElement } from "react"

function ConferenceTemplate({ id, name }): ReactElement {
  return (
    <div>
      <h1>Conference Page</h1>
      <h2>{id}</h2>
      <h2>{name}</h2>
    </div>
  )
}

export default ConferenceTemplate
