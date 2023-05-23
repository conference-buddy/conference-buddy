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
  })

  describe("shows a navigation with links related to the platform", () => {
    const links = [
      {
        text: "How does this work?",
        to: "/",
      },
      {
        text: "Support ConfBuddy",
        to: "/",
      },
    ]

    it("shows a headline", () => {
      const footer = screen.getByRole("contentinfo", {
        name: "Conference Buddy Footer",
      })
      const headline = within(footer).getByRole("heading", {
        name: "Platform",
      })

      expect(headline).toBeVisible()
    })

    it("shows a navigation with links related to the platform", () => {
      const footer = screen.getByRole("contentinfo", {
        name: "Conference Buddy Footer",
      })
      const nav = within(footer).getByRole("navigation", {
        name: "Platform",
      })

      expect(nav).toBeVisible()
    })

    links.forEach(link => {
      it(`shows an internal link to "${link.text}"`, () => {
        const footer = screen.getByRole("contentinfo", {
          name: "Conference Buddy Footer",
        })
        const nav = within(footer).getByRole("navigation", {
          name: "Platform",
        })

        const internalLink = within(nav).getByRole("link", { name: link.text })

        expect(internalLink).toBeVisible()
      })
    })
  })

  describe("shows a card with external links to find conf buddy on social platforms", () => {
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

    it("shows a card with social links", () => {
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

  describe("shows a card with more misc links about Conference Buddy", () => {
    const links = [
      {
        text: "Privacy Policy",
        to: "https://www.iubenda.com/privacy-policy/44138766",
      },
    ]

    it("shows a card with misc links", () => {
      const footer = screen.getByRole("contentinfo", {
        name: "Conference Buddy Footer",
      })
      const list = within(footer).getByRole("list", {
        name: "Misc links about us",
      })

      expect(list).toBeVisible()
    })

    links.forEach(link => {
      it(`shows an external link to "${link.text}"`, () => {
        const footer = screen.getByRole("contentinfo", {
          name: "Conference Buddy Footer",
        })
        const list = within(footer).getByRole("list", {
          name: "Misc links about us",
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
