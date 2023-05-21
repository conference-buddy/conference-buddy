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
    <article className="card mb-5">
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
        <div className="d-flex align-items-center flex-column mt-5">
          <p className="lead">
            🐶&nbsp;&nbsp;2 Conference Buddies for this event
          </p>
          <button
            type="button"
            className="col col-md-4 btn btn-primary mt-2 mb-2"
          >
            Become a Conference Buddy
          </button>
        </div>
      </div>
    </article>
  )
}

export { ConferenceSingle }
