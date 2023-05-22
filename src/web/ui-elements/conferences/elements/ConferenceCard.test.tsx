import { cleanup, render, screen } from "@testing-library/react"
import { ConferenceCard } from "./ConferenceCard"
import { testConference } from "../../../../domain/conferences/test-data"

describe("ConferenceCard", () => {
  beforeAll(() => {
    render(<ConferenceCard conference={testConference} />)
  })

  afterAll(cleanup)

  it("shows the location of the conference", () => {
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const location = screen.getByTestId("conference-location")

    expect(location).toBeVisible()
  })

  it("shows the dates of the conference", () => {
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const dates = screen.getByTestId("conference-dates")

    expect(dates).toBeVisible()
  })

  it("shows the name of the conference as headline", () => {
    const headline = screen.getByRole("heading", {
      name: testConference.name,
    })

    expect(headline).toBeVisible()
  })

  it("shows a internal link to the details page", () => {
    const internalLink = screen.getByRole("link", {
      name: "Details",
    })

    expect(internalLink).toBeVisible()
    expect(internalLink).toHaveAttribute(
      "href",
      `/conference/${testConference.id}`
    )
  })

  it("shows information about the amount of buddies", () => {
    const buddies = screen.getByText("2 buddies for this event")

    expect(buddies).toBeVisible()
  })
})
