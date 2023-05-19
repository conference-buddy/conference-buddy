import { cleanup, render, screen, within } from "@testing-library/react"
import { ConferenceCard } from "./ConferenceCard"
import { testConference } from "../../../../domain/conferences/test-data"

describe("ConferenceCard.vue", () => {
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

  it("shows a link with sensible text for screen readers to the website of the conference", () => {
    const link = screen.getByRole("link", {
      name: testConference.name,
    })

    expect(link).toBeVisible()
    expect(link).toHaveAttribute("href", testConference.url)
  })

  it("shows a link with visual consistent name to website of the conference", () => {
    const link = screen.getByRole("link", {
      name: testConference.name,
    })

    const visuallyHiddenText = within(link).getByText("Visit conference site")

    expect(visuallyHiddenText).toBeInTheDocument()
    expect(visuallyHiddenText).toHaveAttribute("aria-hidden", "true")
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

  it("shows a screen reader only information about the amount of lurkers", () => {
    const lurkers = screen.getByText("14 are following this event")

    expect(lurkers).toBeVisible()
    expect(lurkers).toHaveClass("visually-hidden")
  })

  it("shows a visual information about the amount of lurkers hidden for screen readers", () => {
    const lurkers = screen.getByText("👀 14")

    expect(lurkers).toBeInTheDocument()
    expect(lurkers).toHaveAttribute("aria-hidden", "true")
  })

  it("shows a screen reader only information about the amount of buddies", () => {
    const buddies = screen.getByText("2 buddies for this event")

    expect(buddies).toBeVisible()
    expect(buddies).toHaveClass("visually-hidden")
  })

  it("shows a visual information about the amount of buddies hidden for screen readers", () => {
    const buddies = screen.getByText("🐶 2")

    expect(buddies).toBeInTheDocument()
    expect(buddies).toHaveAttribute("aria-hidden", "true")
  })
})
