import { cleanup, render, screen } from "@testing-library/react"
import { testConference } from "../../../../domain/conferences/test-data"
import { ConferenceList } from "./ConferenceList"
import { getBuddyCount } from "../../../../domain/buddy-posts/api/buddy-posts-api"
import { createWrapperWithQueryClient } from "../../../../services/test-utils/wrapper"

jest.mock("../../../../domain/buddy-posts/api/buddy-posts-api.ts")

const mockGetBuddyCount = getBuddyCount as jest.MockedFunction<
  typeof getBuddyCount
>

const conferenceNames = [
  "First Conference",
  "Second Conference",
  "Third conference",
]
const testConferenceList = conferenceNames.map((name, index) => {
  return { ...testConference, name, id: testConference.id + index }
})

const wrapper = createWrapperWithQueryClient({})
describe("ConferenceList.vue", () => {
  describe("handles an empty list", () => {
    beforeAll(() => {
      mockGetBuddyCount.mockResolvedValue(0)
      render(<ConferenceList conferences={[]} />, { wrapper })
    })

    afterAll(cleanup)

    it("shows an information if there is no conference", () => {
      // text is split into multiple elements, so using a test-id is
      // a good workaround enabling testing
      const noConferences = screen.getByText(
        "Sorry, we can not find any conferences right now."
      )

      expect(noConferences).toBeVisible()
    })
  })

  describe("handles a list of conferences", () => {
    beforeAll(() => {
      mockGetBuddyCount.mockResolvedValue(0)
      render(<ConferenceList conferences={testConferenceList} />, { wrapper })
    })

    afterAll(cleanup)

    it("shows all given conferences", () => {
      const allLocations = screen.getAllByTestId("conference-location")

      expect(allLocations).toHaveLength(testConferenceList.length)
    })

    testConferenceList.forEach(conference => {
      it(`shows the ${conference.name}`, () => {
        const conferenceHeadling = screen.getByRole("heading", {
          name: conference.name,
        })
        expect(conferenceHeadling).toBeVisible()
      })
    })
  })
})
