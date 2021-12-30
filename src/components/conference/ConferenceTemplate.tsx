import React, { FunctionComponent } from "react"
import { Conference } from "src/domain/conference/conference-interface"

const ConferenceTemplate: FunctionComponent<Conference> = ({ id, name }) => (
  <div>
    <h1>Conference Page</h1>
    <h2>{id}</h2>
    <h2>{name}</h2>
  </div>
)

export default ConferenceTemplate
