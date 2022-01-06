import React, { ReactElement } from "react"
import { ConferenceSingle } from "../../domain/conference/single/ConferenceSingle"
import { Conference } from "../../domain/conference/conference-interface"

type ConferenceSinglePageTemplateProps = {
  conference: Conference
}

function ConferenceSinglePageTemplate({
  conference,
}: ConferenceSinglePageTemplateProps): ReactElement {
  return (
    <div className="m-2 container">
      <ConferenceSingle conference={conference} />
    </div>
  )
}

export { ConferenceSinglePageTemplate }
