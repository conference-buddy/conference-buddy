import React, { ReactElement } from "react"
import { Conference } from "../conference-interface"

function ConferenceSingleTemplate({
  conference,
}: {
  conference: Conference
}): ReactElement {
  return (
    <div>
      <h1>{conference.name}</h1>
    </div>
  )
}

export default ConferenceSingleTemplate
