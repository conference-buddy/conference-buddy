import { cleanup, render, screen } from "@testing-library/react"
import { testConference } from "../../../../domain/conferences/test-data"
import { ConferenceList } from "./ConferenceList"

const conferenceNames = [
  "First Conference",
  "Second Conference",
  "Third conference",
]
const testConferenceList = conferenceNames.map((name, index) => {
  return { ...testConference, name, id: testConference.id + index }
})
describe("ConferenceList.vue", () => {
  describe("handles an empty list", () => {
    beforeAll(() => {
      render(<ConferenceList conferences={[]} />)
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
      render(<ConferenceList conferences={testConferenceList} />)
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
