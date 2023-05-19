import { cleanup, render, screen, within } from "@testing-library/react"
import { ConferenceSingle } from "./ConferenceSingle"
import { testConference } from "../../../../domain/conferences/test-data"

describe("ConferenceSingle.vue", () => {
  beforeAll(() => {
    render(<ConferenceSingle conference={testConference} />)
  })

  afterAll(cleanup)

  it("shows an article", () => {
    const article = screen.getByRole("article")

    expect(article).toBeVisible()
  })

  it("shows the name of the conference as headline", () => {
    const article = screen.getByRole("article")
    const headline = within(article).getByRole("heading", {
      name: testConference.name,
    })

    expect(headline).toBeVisible()
  })

  it("shows a link to the website of the conference", () => {
    const article = screen.getByRole("article")
    const url = within(article).getByRole("link", {
      name: testConference.url,
    })

    expect(url).toBeVisible()
    expect(url).toHaveAttribute("href", testConference.url)
  })

  it("shows the location of the conference", () => {
    const article = screen.getByRole("article")
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const location = within(article).getByTestId("conference-location")

    expect(location).toBeVisible()
  })

  it("shows the dates of the conference", () => {
    const article = screen.getByRole("article")
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const dates = within(article).getByTestId("conference-dates")

    expect(dates).toBeVisible()
  })

  it("shows a screen reader only information about the amount of lurkers", () => {
    const article = screen.getByRole("article")
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const lurkers = within(article).getByText("14 are following this event")

    expect(lurkers).toBeVisible()
    expect(lurkers).toHaveClass("visually-hidden")
  })

  it("shows a visual information about the amount of lurkers hidden for screen readers", () => {
    const article = screen.getByRole("article")
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const lurkerButton = within(article).getByRole("button", {
      name: "Become a lurker",
    })
    const text = within(lurkerButton).getByText("👀 14")

    expect(text).toBeInTheDocument()
    expect(text).toHaveAttribute("aria-hidden", "true")
  })

  it("shows a button to subscribe as a lurker", () => {
    const article = screen.getByRole("article")
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const lurkerButton = within(article).getByRole("button", {
      name: "Become a lurker",
    })

    const visuallyHiddenText = within(lurkerButton).getByText("Become a lurker")

    expect(lurkerButton).toBeEnabled()
    expect(visuallyHiddenText).toHaveClass("visually-hidden")
  })

  it("shows a screen reader only information about the amount of buddies", () => {
    const article = screen.getByRole("article")
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const buddies = within(article).getByText("2 buddies for this event")

    expect(buddies).toBeVisible()
    expect(buddies).toHaveClass("visually-hidden")
  })

  it("shows a visual information about the amount of buddies hidden for screen readers", () => {
    const article = screen.getByRole("article")
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const buddyButton = within(article).getByRole("button", {
      name: "Become a Conference Buddy",
    })

    const text = within(buddyButton).getByText("🐶 2")

    expect(text).toBeInTheDocument()
    expect(text).toHaveAttribute("aria-hidden", "true")
  })

  it("shows a button to join as a Conference Buddy", () => {
    const article = screen.getByRole("article")
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const buddyButton = within(article).getByRole("button", {
      name: "Become a Conference Buddy",
    })
    const visuallyHiddenText = within(buddyButton).getByText(
      "Become a Conference Buddy"
    )

    expect(buddyButton).toBeEnabled()
    expect(visuallyHiddenText).toHaveClass("visually-hidden")
  })

  it("shows a description of the conference", () => {
    const article = screen.getByRole("article")
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const description = within(article).getByText(testConference.description)

    expect(description).toBeVisible()
  })
})
