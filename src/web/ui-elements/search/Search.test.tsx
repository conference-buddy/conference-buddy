import { Search } from "./Search"
import { render, cleanup, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const mockNavigate = jest.fn()
jest.mock("gatsby", () => {
  const gatsby = jest.requireActual("gatsby")

  return {
    ...gatsby,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigate: args => mockNavigate(args),
  }
})

const searchTerm = "My search"
const setSearchTerm = jest.fn()
const searchLabel = "Search for things"
const searchDescription = "This is the description"

const requiredProps = {
  searchTerm,
  setSearchTerm,
  searchLabel,
  searchDescription,
}
describe("Search.tsx", () => {
  const user = userEvent.setup()

  describe("renders all necessary elements with required props", () => {
    beforeAll(() => {
      render(<Search {...requiredProps} />)
    })

    afterAll(cleanup)

    it("shows a search form", () => {
      const form = screen.getByRole("search", { name: searchLabel })

      expect(form).toBeEnabled()
    })

    it("shows an accessible description", () => {
      const form = screen.getByRole("search", { name: searchLabel })

      expect(form).toHaveAccessibleDescription(searchDescription)
    })

    it("shows an accessible label for the search input field", () => {
      const form = screen.getByRole("search", { name: searchLabel })
      const input = within(form).getByRole("searchbox")

      expect(input).toBeEnabled()
      expect(input).toHaveAccessibleName(
        "Press submit button or enter to start your search. Press escape to delete search."
      )
    })

    it("shows a given search term as value", () => {
      const form = screen.getByRole("search", { name: searchLabel })
      const input = within(form).getByRole("searchbox")

      expect(input).toHaveValue(searchTerm)
    })

    it("shows a button to submit form", () => {
      const form = screen.getByRole("search", { name: searchLabel })
      const button = within(form).getByRole("button", { name: "Start search" })

      expect(button).toBeEnabled()
    })

    it("shows an icon in button that is hidden for assistive technology", () => {
      const form = screen.getByRole("search", { name: searchLabel })
      const button = within(form).getByRole("button", { name: "Start search" })
      // ds-icon is aria-hidden by default
      const icon = within(button).getByTestId("search-icon")

      expect(icon).toBeVisible()
      expect(icon).toHaveAttribute("aria-hidden", "true")
    })
  })

  describe("enables user to search", () => {
    const testInput = "My new search"

    beforeEach(() => {
      render(<Search {...requiredProps} searchTerm={""} />)
    })

    afterEach(() => {
      jest.resetAllMocks()
      cleanup()
    })

    it("updates value for user input", async () => {
      const form = screen.getByRole("search", { name: searchLabel })
      const input = within(form).getByRole("searchbox")

      expect(input).toHaveValue("")

      await user.type(input, testInput)

      expect(input).toHaveValue(testInput)
    })

    it("submits search term and sets query when user clicks button", async () => {
      const form = screen.getByRole("search", { name: searchLabel })
      const input = within(form).getByRole("searchbox")
      const submitButton = screen.getByRole("button", {
        name: "Start search",
      })

      await user.type(input, testInput)
      await user.click(submitButton)

      expect(setSearchTerm).toHaveBeenCalledWith(testInput)
      expect(mockNavigate).toHaveBeenCalledWith("?search=My+new+search")
    })

    it("submits search term and sets query when user presses enter", async () => {
      const form = screen.getByRole("search", { name: searchLabel })
      const input = within(form).getByRole("searchbox")

      await user.type(input, testInput)
      await user.keyboard("{Enter}")

      expect(setSearchTerm).toHaveBeenCalledWith(testInput)
      expect(mockNavigate).toHaveBeenCalledWith("?search=My+new+search")
    })

    it("removes spaces at beginning and end of search term when users submits", async () => {
      const form = screen.getByRole("search", { name: searchLabel })
      const input = within(form).getByRole("searchbox")

      await user.type(input, ` ${testInput}   `)
      await user.keyboard("{Enter}")

      expect(setSearchTerm).toHaveBeenCalledWith(testInput)
      expect(mockNavigate).toHaveBeenCalledWith("?search=My+new+search")
    })

    it("removes query and goes back to conferences/ when user presses escape", async () => {
      const form = screen.getByRole("search", { name: searchLabel })
      const input = within(form).getByRole("searchbox")

      await user.type(input, testInput)
      await user.keyboard("{Escape}")

      expect(setSearchTerm).toHaveBeenCalledWith("")
      expect(mockNavigate).toHaveBeenCalledWith("/conferences/")
    })

    it("removes query and goes back to conferences/ when user submits empty input", async () => {
      const form = screen.getByRole("search", { name: searchLabel })
      const input = within(form).getByRole("searchbox")

      await user.type(input, " ")
      await user.keyboard("{Enter}")

      expect(setSearchTerm).toHaveBeenCalledWith("")
      expect(mockNavigate).toHaveBeenCalledWith("/conferences/")
    })

    it("removes query and goes back to conferences/ when user deletes existing search term and submits", async () => {
      cleanup()
      render(<Search {...requiredProps} searchTerm={"existing search term"} />)

      const form = screen.getByRole("search", { name: searchLabel })
      const input = within(form).getByRole("searchbox")

      await user.clear(input)
      await user.keyboard("{Enter}")

      expect(setSearchTerm).toHaveBeenCalledWith("")
      expect(mockNavigate).toHaveBeenCalledWith("/conferences/")
    })
  })
})
