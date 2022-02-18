import {
  generateSocialLinks,
  generateEmptySocialLinks,
} from "./generate-social-links-for-profile"
import { SocialLink, SocialLinksDB } from "../types/types-social-links"

const socialLinksFromDB: SocialLinksDB = {
  github: "@programmiri",
  gitlab: "@programmiri",
  id: "97e55ee6-831a-46f1-a0e0-dce2c817f711",
  instagram: undefined,
  linkedin: undefined,
  twitter: "@mirjam_diala",
  website: "programmiri.rocks",
}

const socialLinks = [
  {
    platform: "github" as keyof Omit<SocialLinksDB, "id">,
    platformName: "GitHub",
    linkForm: "username",
    value: "@programmiri",
  },
  {
    platform: "gitlab",
    platformName: "GitLab",
    linkForm: "username",
    value: "@programmiri",
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
    value: "@mirjam_diala",
  },
  {
    platform: "website",
    platformName: "Website",
    linkForm: "url",
    value: "programmiri.rocks",
  },
]

const emptySocialLinks: SocialLink[] = [
  {
    platform: "github",
    platformName: "GitHub",
    linkForm: "username",
  },
  {
    platform: "gitlab",
    platformName: "GitLab",
    linkForm: "username",
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
  },
  {
    platform: "website",
    platformName: "Website",
    linkForm: "url",
  },
]

describe("generate-social-links-for-profile", () => {
  describe("generateEmptySocialLinks", () => {
    it("transforms the social links to be used in profile", () => {
      const result = generateSocialLinks(socialLinksFromDB)

      expect(result).toEqual(socialLinks)
    })
  })

  describe("generateEmptySocialLinks", () => {
    it("generates an empty SocialLinks list", () => {
      const result = generateEmptySocialLinks() as SocialLink[]

      expect(result).toEqual(emptySocialLinks)
    })
  })
})
