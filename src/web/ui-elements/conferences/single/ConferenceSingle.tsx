import React from "react"
import { Conference } from "../../../../domain/conferences"
import { ConferenceLocation } from "../elements/ConferenceLocation"
import { ConferenceDates } from "../elements/ConferenceDates"

type ConferenceSingleProps = {
  conference: Conference
}

function ConferenceSingle({ conference }: ConferenceSingleProps) {
  return (
    <article className="bg-white rounded p-3 mb-5">
      <h1 className="mt-2 mb-3">{conference.name}</h1>
      {conference.url && (
        <p className="mb-1">
          <span aria-hidden="true" className="me-2">
            🌍
          </span>
          <a href={conference.url}>{conference.url}</a>
        </p>
      )}
      <ConferenceLocation city={conference.city} country={conference.country} />
      <ConferenceDates
        startDate={conference.start_date}
        endDate={conference.end_date}
      />
      <div className="my-4 row px-2">
        <div className="visually-hidden">14 are following this event</div>
        <button
          type="button"
          className="col col-md-2 btn btn-outline-secondary me-1"
        >
          <span aria-hidden="true" className="me-2">
            👀 14
          </span>
          <span className="visually-hidden">Become a lurker</span>
        </button>
        <div className="visually-hidden">2 buddies for this event</div>
        <button
          type="button"
          className="col col-md-2 btn btn-outline-secondary ms-1"
        >
          <span aria-hidden="true" className="me-2">
            🐶 2
          </span>
          <span className="visually-hidden">Become a Conference Buddy</span>
        </button>
      </div>
      <p>{conference.description}</p>
    </article>
  )
}

export { ConferenceSingle }
