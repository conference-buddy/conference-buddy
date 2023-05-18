import { cleanup, render, screen } from "@testing-library/react"
import { TextLink } from "./TextLink"

const requiredProps = {
  to: "/this/is/my/link",
}

describe("TextLink.vue", () => {
  describe("renders all necessary elements", () => {
    beforeAll(() => {
      render(
        <TextLink {...requiredProps}>
          <>My link</>
        </TextLink>
      )
    })

    afterAll(cleanup)

    it("shows link", () => {
      const link = screen.getByRole("link", { name: "My link" })

      expect(link).toBeVisible()
    })

    it(`shows a link that links to a given url`, () => {
      const link = screen.getByRole("link", { name: "My link" })

      expect(link).toHaveAttribute("href", requiredProps.to)
    })

    it(`adds a class for a primary text link by default`, () => {
      const link = screen.getByRole("link", { name: "My link" })

      expect(link).toHaveClass("TextLink TextLink-primary")
    })
  })

  describe("renders dependent on props", () => {
    afterEach(cleanup)

    it("adds additional classes", () => {
      const additionalClasses = "additional classes"
      render(
        <TextLink {...requiredProps} additionalClasses={additionalClasses}>
          <>My link</>
        </TextLink>
      )

      const link = screen.getByRole("link", { name: "My link" })

      expect(link).toHaveClass("TextLink TextLink-primary")
    })

    it("shows an internal link", () => {
      render(
        <TextLink {...requiredProps} internal={true}>
          <>My link</>
        </TextLink>
      )

      const link = screen.getByRole("link", {
        name: "My link",
      })

      expect(link).toBeVisible()
      expect(link).toHaveAttribute("href", requiredProps.to)
      expect(link).toHaveAttribute("data-testid", "gatsby-link")
    })
  })
})
