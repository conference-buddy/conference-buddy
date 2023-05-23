import React from "react"
import { Conference } from "../../../../domain/conferences"

type ConferenceDatesProps = {
  startDate: Conference["start_date"]
  endDate: Conference["end_date"]
}
function ConferenceDates({ startDate, endDate }: ConferenceDatesProps) {
  return (
    <div className="mb-1" data-testid="conference-dates">
      <span aria-hidden="true" className="me-2">
        🗓{" "}
      </span>
      <time dateTime={startDate}>
        <span className="visually-hidden">Start: </span>
        {startDate}
      </time>
      <span aria-hidden="true" className="me-1 ms-1">
        {" "}
        -{" "}
      </span>
      <time dateTime={endDate}>
        <span className="visually-hidden">End: </span>
        {endDate}
      </time>
    </div>
  )
}

export { ConferenceDates }
