import React from "react"

export function ConferencesListEntry() {
  return (
    <li className="card mb-3">
      <span className="card-header small">
        <span className="me-3">📍 Frankfurt, Germany</span>
        <span className="me-1">🗓️ 2022-10-10</span>
      </span>
      <span className="card-body">
        <h5 className="card-title">A conference with a long name</h5>
        <span className="col d-flex align-items-baseline small mb-2">
          <span className="me-2 text-primary">#JavaScript</span>
          <span className="me-2 text-primary">#Frontend</span>
          <span className="me-2 text-primary">#Vue</span>
        </span>
        <p className="card-text">
          Lorem Ipsum some conference text that is really not so long.
        </p>
        <span className="col d-flex">
          <button type="button" className="btn btn-primary flex-grow-1 me-2">
            Details
          </button>
          <button type="button" className="btn btn-outline-secondary me-2">
            👀 14
          </button>
          <button type="button" className="btn btn-outline-secondary">
            🐶 2
          </button>
        </span>
      </span>
    </li>
  )
}
