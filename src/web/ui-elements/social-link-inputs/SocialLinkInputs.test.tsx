import { render, screen, cleanup } from "@testing-library/react"
import { SocialLinkInputs } from "./SocialLinkInputs"
import { SocialLink } from "../../../domain/_social-links/types/types-social-links"
import userEvent from "@testing-library/user-event"

const mockOnChange = jest.fn()

const existingSocialLink: SocialLink = {
  platform: "github",
  platformName: "GitHub",
  address: "https://github.com/testgithubuser",
}

const emptySocialLink: SocialLink = {
  platform: "website",
  platformName: "Website",
  address: "",
}

const requiredProps = {
  onChange: mockOnChange,
  socialLinks: [existingSocialLink, emptySocialLink],
}

describe("SocialLinksFieldset", () => {
  const user = userEvent.setup()

  describe("renders all necessary elements", () => {
    beforeAll(() => {
      render(<SocialLinkInputs {...requiredProps} />)
    })

    afterAll(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it(`shows an enabled url input for ${existingSocialLink.platformName}`, () => {
      const input = screen.getByRole("textbox", {
        name: existingSocialLink.platformName,
      })

      expect(input).toBeEnabled()
      expect(input).toHaveAttribute("type", "url")
      expect(input).not.toBeRequired()
    })

    it(`shows a prefilled value for ${existingSocialLink.platformName}`, () => {
      const input = screen.getByRole("textbox", {
        name: existingSocialLink.platformName,
      })

      expect(input).toHaveValue(existingSocialLink.address)
    })

    it(`shows a format information for ${existingSocialLink.platformName} for assistive technology`, () => {
      const desc = "Please enter a valid url."
      const input = screen.getByRole("textbox", {
        name: existingSocialLink.platformName,
      })

      expect(input).toHaveAccessibleDescription(desc)
    })

    it(`shows an enabled text input for ${emptySocialLink.platformName}`, () => {
      const input = screen.getByRole("textbox", {
        name: emptySocialLink.platformName,
      })

      expect(input).toBeEnabled()
      expect(input).toHaveAttribute("type", "url")
      expect(input).not.toBeRequired()
    })

    it(`shows an empty value for ${emptySocialLink.platformName}`, () => {
      const input = screen.getByRole("textbox", {
        name: emptySocialLink.platformName,
      })

      expect(input).toHaveValue("")
    })

    it(`shows a placeholder for ${emptySocialLink.platformName}`, () => {
      const input = screen.getByRole("textbox", {
        name: emptySocialLink.platformName,
      })

      expect(input).toHaveAttribute(
        "placeholder",
        "eg. https://social.media/username"
      )
    })

    it(`shows a format information for ${emptySocialLink.platformName} for assistive technology`, () => {
      const desc = "Please enter a valid url."
      const input = screen.getByRole("textbox", {
        name: emptySocialLink.platformName,
      })

      expect(input).toHaveAccessibleDescription(desc)
    })

    it("takes a function as onChange event and propagates index of link", async () => {
      const input = screen.getByRole("textbox", {
        name: emptySocialLink.platformName,
      })

      await user.type(input, "one")

      expect(mockOnChange).toHaveBeenNthCalledWith(1, "o", 1)
      expect(mockOnChange).toHaveBeenNthCalledWith(2, "n", 1)
      expect(mockOnChange).toHaveBeenNthCalledWith(3, "e", 1)
    })
  })
})
