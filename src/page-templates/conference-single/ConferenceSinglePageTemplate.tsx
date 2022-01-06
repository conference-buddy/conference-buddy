import React, { ReactElement } from "react"
import { ConferenceSingle } from "../../domain/conference/single/ConferenceSingle"
import { Conference } from "../../domain/conference/conference-interface"
import { TextLink } from "../../ui-elements/text-link/TextLink"

type ConferenceSinglePageTemplateProps = {
  conference: Conference
}

function ConferenceSinglePageTemplate({
  conference,
}: ConferenceSinglePageTemplateProps): ReactElement {
  return (
    <div className="container">
      <div className="mb-3">
        <TextLink internal={true} to={"/conference-list"}>
          &larr; Back to Conferences
        </TextLink>
      </div>
      <ConferenceSingle conference={conference} />
    </div>
  )
}

export { ConferenceSinglePageTemplate }
