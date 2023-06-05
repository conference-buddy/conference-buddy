import { cleanup, render, screen, within } from "@testing-library/react"
import React from "react"
import { Footer } from "./Footer"

describe("Footer", () => {
  beforeAll(() => {
    render(<Footer />)
  })

  afterAll(cleanup)

  describe("shows a footer with an overview of the most important content infos", () => {
    it("shows a footer", () => {
      const footer = screen.getByRole("contentinfo", {
        name: "Conference Buddy Footer",
      })

      expect(footer).toBeVisible()
    })

    it(`shows an external link to ""Privacy Policy""`, () => {
      const footer = screen.getByRole("contentinfo", {
        name: "Conference Buddy Footer",
      })

      const externalLink = within(footer).getByRole("link", {
        name: "Privacy Policy",
      })

      expect(externalLink).toBeVisible()
      expect(externalLink).toHaveAttribute(
        "href",
        "https://www.iubenda.com/privacy-policy/44138766"
      )
    })

    describe("shows a list with external links to find conf buddy on social platforms", () => {
      const links = [
        {
          text: "Github",
          to: "https://github.com/conference-buddy/",
        },
        {
          text: "Mastodon",
          to: "https://hachyderm.io/@ConfBuddy",
        },
        {
          text: "Twitter",
          to: "https://twitter.com/confbuddy",
        },
      ]

      it("shows a list with social links", () => {
        const footer = screen.getByRole("contentinfo", {
          name: "Conference Buddy Footer",
        })
        const list = within(footer).getByRole("list", {
          name: "Links to our social media",
        })

        expect(list).toBeVisible()
      })

      links.forEach(link => {
        it(`shows an external link to "${link.text}"`, () => {
          const footer = screen.getByRole("contentinfo", {
            name: "Conference Buddy Footer",
          })
          const list = within(footer).getByRole("list", {
            name: "Links to our social media",
          })

          const externalLink = within(list).getByRole("link", {
            name: link.text,
          })

          expect(externalLink).toBeVisible()
          expect(externalLink).toHaveAttribute("href", link.to)
        })
      })
    })
  })
})
