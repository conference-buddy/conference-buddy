import React from "react"

export function ConferencesListEntry() {
  return (
    <li className="list-group-item mb-3">
      <div className="row row-cols-1">
        <div className="col d-flex justify-content-end mb-3">
          <button type="button" className="btn btn-outline-secondary me-2">
            👀 14
          </button>
          <button type="button" className="btn btn-outline-secondary">
            🐶 2
          </button>
        </div>
        <div className="pb-2 col d-flex justify-content-between align-items-center">
          <h3 className="h4 mb-0">A conference with a long name</h3>
        </div>

        <div className="pb-2 col small">
          <div className="d-flex align-items-center">
            <span>🗓️ 2022-10-10</span>
            <span>📍 Frankfurt</span>
          </div>
        </div>

        <div className="col">
          <p>Lorem Ipsum some conference text that is really not so long.</p>
        </div>
        <div className="d-flex align-items-baseline pb-2 col">
          <span className="badge bg-gray me-2">JavaScript</span>
          <span className="badge bg-gray me-2">Frontend</span>
          <span className="badge bg-gray me-2">Vue</span>
        </div>

        <div className="col my-3 d-flex">
          <button type="button" className="btn btn-primary flex-grow-1">
            See conference details
          </button>
        </div>
      </div>
    </li>
  )
}
