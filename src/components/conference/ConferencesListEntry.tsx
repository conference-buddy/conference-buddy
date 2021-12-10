import React, { ReactElement } from "react"
import { Conference } from "../../domain/conference/conference-interface"

export function ConferencesListEntry({
  conference,
}: {
  conference: Conference
}): ReactElement {
  const tagList = conference.tags.split(",").map((tag, index) => {
    return (
      <span key={index} className="me-2 text-primary">
        #{tag.trim()}
      </span>
    )
  })

  return (
    <li className="card mb-3">
      <span className="card-header small d-flex flex-column flex-md-row justify-content-md-between">
        <span className="me-md-3">
          📍 {conference.city}, {conference.country}
        </span>
        <span className="">
          🗓️ {conference.startDate} - {conference.endDate}
        </span>
      </span>
      <span className="card-body">
        <h5 className="card-title">{conference.title}</h5>
        <span className="d-flex align-items-baseline small mb-2">
          {tagList}
        </span>
        <p className="card-text">{conference.description}</p>
        <span className="d-flex justify-content-md-between">
          <button
            type="button"
            className="btn btn-primary flex-grow-1 flex-md-grow-0 w-25 me-2"
          >
            Details
          </button>
          <div>
            <button type="button" className="btn btn-outline-secondary me-2">
              👀 14
            </button>
            <button type="button" className="btn btn-outline-secondary">
              🐶 2
            </button>
          </div>
        </span>
      </span>
    </li>
  )
}
