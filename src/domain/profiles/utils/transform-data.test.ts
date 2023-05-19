import { transformProfile } from "./transform-data"
import { Profile, ProfileDB } from "../types/types-profiles"
import { SocialLinksDB } from "../../_social-links/types/types-social-links"

const profileFromDB: ProfileDB = {
  id: "djalsdasjlda_asjdkajsd_asdasd",
  created_at: "",
  updated_at: "",
  provider: "github",
  email: "some@email.de",
  name: "Test User",
  username: "test_user",
  avatar_url: null,
  about_text: null,
}

const socialLinksFromDB: SocialLinksDB = {
  id: "string",
  website: "somewebsite",
  github: "@name",
  gitlab: "@otherName",
  twitter: null,
  mastodon: null,
  linkedin: null,
}

describe("transform-data", () => {
  const expectedResult: Profile = {
    id: "djalsdasjlda_asjdkajsd_asdasd",
    created_at: "",
    updated_at: "",
    provider: "github",
    email: "some@email.de",
    name: "Test User",
    username: "test_user",
    avatar_url: null,
    about_text: null,
    social_links: [
      {
        platform: "website",
        platformName: "Website",
        address: "somewebsite",
      },
      {
        platform: "github",
        platformName: "GitHub",
        address: "@name",
      },
      {
        platform: "gitlab",
        platformName: "GitLab",
        address: "@otherName",
      },
      {
        platform: "twitter",
        platformName: "Twitter",
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
    ],
  }

  it("'transformProfile' transforms the profile from DB for web", () => {
    const result = transformProfile({ profileFromDB, socialLinksFromDB })

    expect(result).toStrictEqual(expectedResult)
  })
})
