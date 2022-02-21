import {
  transformPublicProfile,
  transformPublicProfiles,
} from "./transform-data"
import { ProfileDB } from "../../profiles/types/types-profiles"
import { PublicProfile } from "../types/types-public-profile"
import { SocialLinksDB } from "../../_social-links/types/types-social-links"

const profilesFromDB: ProfileDB[] = [
  {
    id: "97e55ee6-831a-46f1-a0e0-dce2c817f711",
    updated_at: "2022-01-26T04:10:45.15264+00:00",
    name: "Mirjam",
    username: "programmiri",
    provider: "github",
    email: "me@programmiri.rocks",
    created_at: "2022-01-26T04:10:45.15264+00:00",
    about_text: "#About me",
  },
  {
    id: "934233523523-234234-234234--2351fgk",
    updated_at: "2022-01-26T04:10:45.15264+00:00",
    name: "Not Mirjam",
    username: "progranono",
    provider: "github",
    email: "me@programmiri.rocks",
    created_at: "2022-01-26T04:10:45.15264+00:00",
    about_text: "More text about me",
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
    id: "anothersuserid",
    website: undefined,
    github: "someusername",
    gitlab: undefined,
    twitter: undefined,
    linkedin: undefined,
  },
  {
    id: "934233523523-234234-234234--2351fgk",
    website: "nicewebsite.de",
    github: undefined,
    gitlab: undefined,
    twitter: undefined,
    linkedin: undefined,
  },
]

describe("transform-data", () => {
  describe("transformPublicProfiles", () => {
    const expectedOutcome: PublicProfile[] = [
      {
        about_text: "#About me",
        created_at: "2022-01-26T04:10:45.15264+00:00",
        name: "Mirjam",
        username: "programmiri",
        social_links: [
          {
            platform: "website",
            platformName: "Website",
            linkForm: "url",
            value: undefined,
          },
          {
            platform: "github",
            platformName: "GitHub",
            linkForm: "username",
            value: undefined,
          },
          {
            platform: "gitlab",
            platformName: "GitLab",
            linkForm: "username",
            value: undefined,
          },
          {
            platform: "twitter",
            platformName: "Twitter",
            linkForm: "username",
            value: "Twitter Name",
          },
          {
            platform: "linkedin",
            platformName: "LinkedIn",
            linkForm: "username",
            value: undefined,
          },
        ],
      },
      {
        about_text: "More text about me",
        created_at: "2022-01-26T04:10:45.15264+00:00",
        name: "Not Mirjam",
        username: "progranono",
        social_links: [
          {
            platform: "website",
            platformName: "Website",
            linkForm: "url",
            value: "nicewebsite.de",
          },
          {
            platform: "github",
            platformName: "GitHub",
            linkForm: "username",
            value: undefined,
          },
          {
            platform: "gitlab",
            platformName: "GitLab",
            linkForm: "username",
            value: undefined,
          },
          {
            platform: "twitter",
            platformName: "Twitter",
            linkForm: "username",
            value: undefined,
          },
          {
            platform: "linkedin",
            platformName: "LinkedIn",
            linkForm: "username",
            value: undefined,
          },
        ],
      },
    ]

    it("transforms all profiles from DB as PublicProfiles", () => {
      const result = transformPublicProfiles({
        profilesFromDB,
        socialLinksFromDB,
      })

      expect(result).toStrictEqual(expectedOutcome)
    })
  })

  describe("transformPublicProfile", () => {
    const expectedOutcome: PublicProfile = {
      about_text: "#About me",
      created_at: "2022-01-26T04:10:45.15264+00:00",
      name: "Mirjam",
      username: "programmiri",
      social_links: [
        {
          platform: "website",
          platformName: "Website",
          linkForm: "url",
          value: undefined,
        },
        {
          platform: "github",
          platformName: "GitHub",
          linkForm: "username",
          value: undefined,
        },
        {
          platform: "gitlab",
          platformName: "GitLab",
          linkForm: "username",
          value: undefined,
        },
        {
          platform: "twitter",
          platformName: "Twitter",
          linkForm: "username",
          value: "Twitter Name",
        },
        {
          platform: "linkedin",
          platformName: "LinkedIn",
          linkForm: "username",
          value: undefined,
        },
      ],
    }

    it("transforms one profile from DB as PublicProfiles", () => {
      const result = transformPublicProfile({
        profileFromDB: profilesFromDB[0],
        socialLinksFromDB: socialLinksFromDB[0],
      })

      expect(result).toStrictEqual(expectedOutcome)
    })
  })
})
