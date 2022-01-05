import React, { ReactElement } from "react"
import { Conference } from "../../domain/conference/conference-interface"
import { Link } from "gatsby"
import useProfile from "../../hooks/useProfile"

function ConferencesListEntry({
  conference,
}: {
  conference: Conference
}): ReactElement {
  const { data: user } = useProfile()

  return (
    <li className="card mb-3">
      <span className="card-header small d-flex flex-column flex-md-row justify-content-md-between">
        <span className="me-md-3">
          📍 {conference.city}, {conference.country}
        </span>
        <span className="">
          🗓️ {conference.start_date} - {conference.end_date}
        </span>
      </span>
      <span className="card-body">
        <h5 className="card-title">{conference.name}</h5>
        <p className="card-text">{conference.description}</p>
        {conference.url ? (
          <p>
            <a className="card-text" href={conference.url}>
              visit conference site
            </a>
          </p>
        ) : null}
        <span className="d-flex justify-content-md-between">
          <Link
            to={`../conference/${conference.id}`}
            className="btn btn-primary flex-grow-1 flex-md-grow-0 w-25 me-2"
          >
            Details
          </Link>
          <div>
            {user ? (
              <>
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                >
                  👀 14
                </button>
                <button type="button" className="btn btn-outline-secondary">
                  🐶 2
                </button>
              </>
            ) : (
              <>
                <div className="btn bg-dark bg-opacity-10 text-confbuddy-pink disabled opacity-100 me-2">
                  👀 14
                </div>
                <div className="btn bg-dark bg-opacity-10 text-confbuddy-pink disabled opacity-100">
                  🐶 2
                </div>
              </>
            )}
          </div>
        </span>
      </span>
    </li>
  )
}

export { ConferencesListEntry }
