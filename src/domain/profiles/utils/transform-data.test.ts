import { transformProfile } from "./transform-data"
import { ProfileDB, SocialLinksDB } from "../types/types-profiles"

const profileFromDB: ProfileDB = {
  id: "",
  created_at: "",
  updated_at: "",
  provider: "",
  email: "",
  name: "",
  username: "",
}

const socialLinksFromDB: SocialLinksDB = {
  id: "string",
  website: "somewebsite",
  github: "@name",
  gitlab: "@otherName",
}

const profile = {
  id: "",
  created_at: "",
  updated_at: "",
  provider: "",
  email: "",
  name: "",
  username: "",
  social_links: [
    { website: "somewebsite" },
    { github: "@name" },
    { gitlab: "@otherName" },
  ],
}
describe("transform-data", () => {
  it("transforms the profile from DB for web", () => {
    const result = transformProfile({ profileFromDB, socialLinksFromDB })

    expect(result).toEqual(profile)
  })
})
