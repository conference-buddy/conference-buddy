import React from "react"
import { Conference } from "../../../../domain/conferences"
import { ConferenceLocation } from "../elements/ConferenceLocation"
import { ConferenceDates } from "../elements/ConferenceDates"
import { TextLink } from "../../text-link/TextLink"

type ConferenceSingleProps = {
  conference: Conference
}

function ConferenceSingle({ conference }: ConferenceSingleProps) {
  return (
    <>
      <article className="card mb-4">
        <div className="card-header small d-flex flex-column flex-md-row justify-content-md-between">
          <ConferenceLocation
            city={conference.city}
            country={conference.country}
          />
          <ConferenceDates
            startDate={conference.start_date}
            endDate={conference.start_date}
          />
        </div>
        <div className="card-body">
          <h1 className="mt-2 mb-3">{conference.name}</h1>
          {conference.url && (
            <p className="mb-1">
              <span aria-hidden="true" className="me-2">
                🌐
              </span>
              <TextLink to={conference.url} internal={false}>
                {conference.url}
              </TextLink>
            </p>
          )}
          <p className="mt-5">{conference.description}</p>
        </div>
      </article>
    </>
  )
}

export { ConferenceSingle }
