import { transformPublicProfiles } from "./transform-data"
import { ProfileDB, SocialLinksDB } from "../../profiles/types/types-profiles"
import { PublicProfile } from "../types/types-public-profile"

const profilesFromDB: ProfileDB[] = [
  {
    id: "97e55ee6-831a-46f1-a0e0-dce2c817f711",
    updated_at: "2022-01-26T04:10:45.15264+00:00",
    name: "Mirjam",
    username: "programmiri",
    provider: "github",
    email: "me@programmiri.rocks",
    created_at: "2022-01-26T04:10:45.15264+00:00",
  },
  {
    id: "934233523523-234234-234234--2351fgk",
    updated_at: "2022-01-26T04:10:45.15264+00:00",
    name: "Not Mirjam",
    username: "progranono",
    provider: "github",
    email: "me@programmiri.rocks",
    created_at: "2022-01-26T04:10:45.15264+00:00",
  },
]

const socialLinksFromDB: SocialLinksDB[] = [
  {
    id: "97e55ee6-831a-46f1-a0e0-dce2c817f711",
    website: undefined,
    github: undefined,
    gitlab: undefined,
    twitter: "Twitter Name",
    linkedin: undefined,
  },
  {
    id: "nothere",
    website: undefined,
    github: undefined,
    gitlab: undefined,
    twitter: "Twitter Name",
    linkedin: undefined,
  },
]

const expectedOutcome: PublicProfile[] = [
  {
    created_at: "2022-01-26T04:10:45.15264+00:00",
    name: "Mirjam",
    username: "programmiri",
    social_links: [{ twitter: "Twitter Name" }],
  },
  {
    created_at: "2022-01-26T04:10:45.15264+00:00",
    name: "Not Mirjam",
    username: "progranono",
  },
]

describe("transform-data", () => {
  it("transforms all profiles from DB for web", () => {
    const result = transformPublicProfiles({
      profilesFromDB,
      socialLinksFromDB,
    })

    expect(result).toStrictEqual(expectedOutcome)
  })
})
