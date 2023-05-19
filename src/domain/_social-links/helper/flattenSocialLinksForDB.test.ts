import { flattenSocialLinks } from "./flattenSocialLinksForDB"
import { SocialLink } from "../types/types-social-links"

describe("flatten-social-links-for-db.ts", () => {
  describe("flattenSocialLinks", () => {
    const input: SocialLink[] = [
      {
        platform: "github",
        platformName: "GitHub",
        address: "programmiri",
      },
      {
        platform: "gitlab",
        platformName: "GitLab",
        address: "programmiri",
      },
      {
        platform: "mastodon",
        platformName: "Mastodon",
        address: "",
      },
      {
        platform: "linkedin",
        platformName: "LinkedIn",
        address: "",
      },
      {
        platform: "twitter",
        platformName: "Twitter",
        address: "mirjam_diala",
      },
      {
        platform: "website",
        platformName: "Website",
        address: "",
      },
    ]

    const expectedResult = {
      github: "programmiri",
      gitlab: "programmiri",
      mastodon: null,
      linkedin: null,
      twitter: "mirjam_diala",
      website: null,
    }

    it("prepares the socialLinks for adding them to the database", () => {
      const result = flattenSocialLinks(input)

      expect(result).toEqual(expectedResult)
    })
  })
})
