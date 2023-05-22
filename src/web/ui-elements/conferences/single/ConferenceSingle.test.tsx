import { cleanup, render, screen, within } from "@testing-library/react"
import { ConferenceSingle } from "./ConferenceSingle"
import { testConference } from "../../../../domain/conferences/test-data"
import { createWrapperWithQueryClient } from "../../../../services/test-utils/wrapper"
import { Profile } from "../../../../domain/profiles"
import useProfile from "../../../../services/hooks/profile/useProfile"
import { UseQueryResult } from "@tanstack/react-query"
import { getBuddyPosts } from "../../../../domain/buddy-posts"
import { createBuddyPost } from "../../../../domain/buddy-posts/api/buddy-posts-api"

jest.mock("@supabase/supabase-js")
jest.mock("../../../../services/hooks/profile/useProfile")
jest.mock("../../../../domain/buddy-posts/api/buddy-posts-api.ts")

const mockUseProfile = useProfile as jest.MockedFunction<typeof useProfile>
const mockGetBuddyPosts = getBuddyPosts as jest.MockedFunction<
  typeof getBuddyPosts
>
const mockCreateBuddyPosts = createBuddyPost as jest.MockedFunction<
  typeof createBuddyPost
>

const wrapper = createWrapperWithQueryClient({})

describe("ConferenceSingle.vue", () => {
  beforeAll(() => {
    mockUseProfile.mockReturnValue({
      data: { username: "me" },
    } as UseQueryResult<Profile, never>)
    mockGetBuddyPosts.mockResolvedValue([])
    mockCreateBuddyPosts.mockImplementation(jest.fn())
    render(<ConferenceSingle conference={testConference} />, { wrapper })
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

  it("shows information about the amount of buddies", () => {
    const article = screen.getByRole("article")
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const buddies = within(article).getByText(
      "2 Conference Buddies for this event"
    )

    expect(buddies).toBeVisible()
  })

  it("shows a button to join as a Conference Buddy", () => {
    const article = screen.getByRole("article")
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const buddyButton = within(article).getByRole("button", {
      name: "Become a Conference Buddy",
    })

    expect(buddyButton).toBeEnabled()
  })

  it("shows a description of the conference", () => {
    const article = screen.getByRole("article")
    // text is split into multiple elements, so using a test-id is
    // a good workaround enabling testing
    const description = within(article).getByText(testConference.description)

    expect(description).toBeVisible()
  })
})
