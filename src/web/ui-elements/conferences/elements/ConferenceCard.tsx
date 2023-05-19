import React from "react"
import { ConferenceLocation } from "./ConferenceLocation"
import { Conference } from "../../../../domain/conferences"
import { ConferenceDates } from "./ConferenceDates"
import { Link } from "gatsby"

type ConferenceCardProps = {
  conference: Conference
}
function ConferenceCard({ conference }: ConferenceCardProps) {
  return (
    <div className="card mb-3">
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
        <h5 className="card-title">{conference.name}</h5>
        {conference.url && (
          <p>
            <a className="card-text" href={conference.url}>
              <span className="visually-hidden">{conference.name}</span>
              <span aria-hidden="true">Visit conference site</span>
            </a>
          </p>
        )}
        <p className="d-flex justify-content-md-between">
          <Link
            to={`/conference/${conference.id}`}
            className="btn btn-primary flex-grow-1 flex-md-grow-0 w-25 me-2"
          >
            Details
          </Link>
          <span>
            <span className="visually-hidden">14 are following this event</span>
            <span
              aria-hidden="true"
              className="btn bg-dark bg-opacity-10 text-confbuddy-pink disabled opacity-100 me-2"
            >
              👀 14
            </span>
            <span className="visually-hidden">2 buddies for this event</span>
            <span
              aria-hidden="true"
              className="btn bg-dark bg-opacity-10 text-confbuddy-pink disabled opacity-100"
            >
              🐶 2
            </span>
          </span>
        </p>
      </div>
    </div>
  )
}

export { ConferenceCard }
