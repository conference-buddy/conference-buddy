import React from "react"
import { Conference } from "../../../../domain/conferences"
import { IconMapPin } from "@tabler/icons-react"

type ConferenceLocationProps = {
  city: Conference["city"]
  country: Conference["country"]
}
function ConferenceLocation({ city, country }: ConferenceLocationProps) {
  return (
    <div className="mb-1" data-testid="conference-location">
      <span aria-hidden="true" className="me-1">
        <IconMapPin />
      </span>
      <span className="visually-hidden">Location: </span>
      {city}, {country}
    </div>
  )
}

export { ConferenceLocation }
