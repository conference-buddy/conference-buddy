import { cleanup, render, screen } from "@testing-library/react"
import { ConferenceCard } from "./ConferenceCard"
import { testConference } from "../../../../domain/conferences/test-data"
import { createWrapperWithQueryClient } from "../../../../services/test-utils/wrapper"
import { getBuddyCount } from "../../../../domain/buddy-posts/api/buddy-posts-api"

jest.mock("../../../../domain/buddy-posts/api/buddy-posts-api.ts")
const mockGetBuddyCount = getBuddyCount as jest.MockedFunction<
  typeof getBuddyCount
>

const wrapper = createWrapperWithQueryClient({})
describe("ConferenceCard", () => {
  beforeAll(() => {
    mockGetBuddyCount.mockResolvedValue(2)
    render(<ConferenceCard conference={testConference} />, { wrapper })
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

  it("shows information about the amount of buddies", async () => {
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const buddies = await screen.findByTestId(
      "conference-buddies-on-conference-amount"
    )

    expect(buddies).toHaveTextContent("2 Conference Buddies")
  })
})
