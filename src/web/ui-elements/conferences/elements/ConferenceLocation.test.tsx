import { cleanup, render, screen } from "@testing-library/react"
import { testConference } from "../../../../domain/conferences/test-data"
import { ConferenceLocation } from "./ConferenceLocation"

const testLocation = {
  city: testConference.city,
  country: testConference.country,
}

describe("ConferenceLocation.vue", () => {
  beforeAll(() => {
    render(
      <ConferenceLocation
        city={testLocation.city}
        country={testLocation.country}
      />
    )
  })

  afterAll(cleanup)

  it("shows the location of a conference in a sensible format for screen readers", () => {
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const location = screen.getByTestId("conference-location")

    expect(location).toHaveTextContent(
      `Location: ${testConference.city}, ${testConference.country}`
    )
  })
})
