import React, { ReactElement } from "react"
import { Conference } from "../../../../domain/conferences/types/conference-interface"

type ConferenceSingleProps = {
  conference: Conference
}

function ConferenceSingle({ conference }: ConferenceSingleProps): ReactElement {
  return (
    <>
      <article className="bg-white rounded p-3 mb-5">
        <h1 className="mt-2 mb-3">{conference.name}</h1>
        {conference.url ? (
          <p className="mb-1">
            🌍 <a href={conference.url}>{conference.url}</a>
          </p>
        ) : null}
        <p className="mb-1">
          📍 {conference.city}, {conference.country}
        </p>
        <p className="mb-1">
          🗓{" "}
          <time dateTime={conference.start_date}>{conference.start_date}</time>{" "}
          -<time dateTime={conference.end_date}>{conference.end_date}</time>
        </p>
        <div className="my-4 row px-2">
          <button
            type="button"
            className="col col-md-2 btn btn-outline-secondary me-1"
          >
            👀 14
          </button>
          <button
            type="button"
            className="col col-md-2 btn btn-outline-secondary ms-1"
          >
            🐶 2
          </button>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          lacinia nec elit in ultrices. Maecenas nunc sapien, maximus et rhoncus
          eu, lacinia ut purus. Nulla nec tempor velit, et suscipit augue.
          Vestibulum blandit luctus ex. Etiam hendrerit lectus vel volutpat
          dictum. Aliquam bibendum cursus luctus. Duis eleifend ut sapien quis
          malesuada. Suspendisse posuere egestas malesuada. Nam turpis elit,
          imperdiet ac vestibulum eget, ornare vel ligula. Vivamus tempor,
          sapien eget rutrum gravida, sem quam pretium ligula, a efficitur elit
          neque quis turpis.
        </p>
      </article>
    </>
  )
}

export { ConferenceSingle }
