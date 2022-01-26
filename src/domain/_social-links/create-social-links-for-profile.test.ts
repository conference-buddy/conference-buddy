import { SocialLink, SocialLinksDB } from "../profiles/types/types-profiles"
import { createSocialLinks } from "./create-social-links-for-profile"

const socialLinksFromDB: SocialLinksDB = {
  id: "string",
  website: "somewebsite",
  github: "@name",
  gitlab: "@otherName",
}

const socialLinks: SocialLink[] = [
  { website: "somewebsite" },
  { github: "@name" },
  { gitlab: "@otherName" },
]

describe("create-social-links-for-profile", () => {
  it("transforms the social links to be used in profile", () => {
    const result = createSocialLinks(socialLinksFromDB)

    expect(result).toEqual(socialLinks)
  })
})
