import {
  generateSocialLinks,
  generateEmptySocialLinks,
} from "./generate-social-links-for-profile"
import { SocialLink, SocialLinksDB } from "../types/types-social-links"

const socialLinksFromDB: SocialLinksDB = {
  profile_id: "none",
  github: "@programmiri",
  gitlab: "@programmiri",
  id: "97e55ee6-831a-46f1-a0e0-dce2c817f711",
  mastodon: null,
  linkedin: null,
  twitter: "@mirjam_diala",
  website: "programmiri.rocks",
}

const socialLinks = [
  {
    platform: "github" as keyof Omit<SocialLinksDB, "id">,
    platformName: "GitHub",
    address: "@programmiri",
  },
  {
    platform: "gitlab",
    platformName: "GitLab",
    address: "@programmiri",
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
    address: "@mirjam_diala",
  },
  {
    platform: "website",
    platformName: "Website",
    address: "programmiri.rocks",
  },
]

const emptySocialLinks: SocialLink[] = [
  {
    platform: "github",
    platformName: "GitHub",
    address: "",
  },
  {
    platform: "gitlab",
    platformName: "GitLab",
    address: "",
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
    address: "",
  },
  {
    platform: "website",
    platformName: "Website",
    address: "",
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
