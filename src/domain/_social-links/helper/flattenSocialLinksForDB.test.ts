import { flattenSocialLinks } from "./flattenSocialLinksForDB"
import { SocialLink } from "../types/types-social-links"

describe("flatten-social-links-for-db.ts", () => {
  describe("flattenSocialLinks", () => {
    const input: SocialLink[] = [
      {
        platform: "github",
        platformName: "GitHub",
        linkForm: "username",
        value: "programmiri",
      },
      {
        platform: "gitlab",
        platformName: "GitLab",
        linkForm: "username",
        value: "programmiri",
      },
      {
        platform: "instagram",
        platformName: "Instagram",
        linkForm: "username",
      },
      {
        platform: "linkedin",
        platformName: "LinkedIn",
        linkForm: "username",
      },
      {
        platform: "twitter",
        platformName: "Twitter",
        linkForm: "username",
        value: "mirjam_diala",
      },
      {
        platform: "website",
        platformName: "Website",
        linkForm: "url",
      },
    ]

    const expectedResult = {
      github: "programmiri",
      gitlab: "programmiri",
      instagram: undefined,
      linkedin: undefined,
      twitter: "mirjam_diala",
      website: undefined,
    }

    it("prepares the socialLinks for adding them to the database", () => {
      const result = flattenSocialLinks(input)

      expect(result).toEqual(expectedResult)
    })
  })
})
