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
}

const socialLinksFromDB: SocialLinksDB = {
  id: "string",
  website: "somewebsite",
  github: "@name",
  gitlab: "@otherName",
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
    social_links: [
      {
        platform: "website",
        platformName: "Website",
        linkForm: "url",
        value: "somewebsite",
      },
      {
        platform: "github",
        platformName: "GitHub",
        linkForm: "username",
        value: "@name",
      },
      {
        platform: "gitlab",
        platformName: "GitLab",
        linkForm: "username",
        value: "@otherName",
      },
    ],
  }

  it("'transformProfile' transforms the profile from DB for web", () => {
    const result = transformProfile({ profileFromDB, socialLinksFromDB })

    expect(result).toStrictEqual(expectedResult)
  })
})
