import { cleanup, render, screen } from "@testing-library/react"
import { testConference } from "../../../../domain/conferences/test-data"
import { ConferenceDates } from "./ConferenceDates"

const testDates = {
  start_date: testConference.start_date,
  end_date: testConference.end_date,
}

describe("ConferenceDates.vue", () => {
  beforeAll(() => {
    render(
      <ConferenceDates
        startDate={testDates.start_date}
        endDate={testDates.end_date}
      />
    )
  })

  afterAll(cleanup)

  it("shows the dates of a conference in a sensible format for screen readers", () => {
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const dates = screen.getByTestId("conference-dates")

    expect(dates).toBeVisible()

    expect(dates).toHaveTextContent(`Start: ${testDates.start_date}`)
    expect(dates).toHaveTextContent(`End: ${testDates.end_date}`)
  })
})
