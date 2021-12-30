import React, { FunctionComponent } from "react"
import { Conference } from "../../domain/conference/conference-interface"

const ConferenceTemplate: FunctionComponent<Conference> = ({ conference,
}: {
  conference: Conference }) => (
  <div>
    <h1>Conference Page</h1>
    <h2>{conference.name}</h2>
  </div>
)

export default ConferenceTemplate
