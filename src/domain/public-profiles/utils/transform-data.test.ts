import {
  transformPublicProfile,
  transformPublicProfiles,
} from "./transform-data"
import { PublicProfile, PublicProfileDB } from "../types/types-public-profile"
import { SocialLinksDB } from "../../_social-links/types/types-social-links"

const publicProfilesFromDB: PublicProfileDB[] = [
  {
    id: "97e55ee6-831a-46f1-a0e0-dce2c817f711",
    name: "Mirjam",
    username: "programmiri",
    about_text: "#About me",
    avatar_url: "https://some-image.de/foo.png",
  },
  {
    id: "934233523523-234234-234234--2351fgk",
    name: "Not Mirjam",
    username: "progranono",
    about_text: "More text about me",
    avatar_url: "https://some-image.de/foo.png",
  },
]

const socialLinksFromDB: SocialLinksDB[] = [
  {
    profile_id: "none",
    id: "97e55ee6-831a-46f1-a0e0-dce2c817f711",
    website: null,
    github: null,
    gitlab: null,
    twitter: "Twitter Name",
    linkedin: null,
    mastodon: null,
  },
  {
    profile_id: "none",
    id: "anothersuserid",
    website: null,
    github: "someusername",
    gitlab: null,
    twitter: null,
    linkedin: null,
    mastodon: null,
  },
  {
    profile_id: "none",
    id: "934233523523-234234-234234--2351fgk",
    website: "nicewebsite.de",
    github: null,
    gitlab: null,
    twitter: null,
    linkedin: null,
    mastodon: null,
  },
]

describe("transform-data", () => {
  describe("transformPublicProfiles", () => {
    const expectedOutcome: PublicProfile[] = [
      {
        id: "97e55ee6-831a-46f1-a0e0-dce2c817f711",
        about_text: "#About me",
        name: "Mirjam",
        username: "programmiri",
        avatar_url: "https://some-image.de/foo.png",
        social_links: [
          {
            platform: "website",
            platformName: "Website",
            address: "",
          },
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
            platform: "twitter",
            platformName: "Twitter",
            address: "Twitter Name",
          },
          {
            platform: "linkedin",
            platformName: "LinkedIn",
            address: "",
          },
          {
            platform: "mastodon",
            platformName: "Mastodon",
            address: "",
          },
        ],
      },
      {
        id: "934233523523-234234-234234--2351fgk",
        about_text: "More text about me",
        name: "Not Mirjam",
        username: "progranono",
        avatar_url: "https://some-image.de/foo.png",
        social_links: [
          {
            platform: "website",
            platformName: "Website",
            address: "nicewebsite.de",
          },
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
            platform: "twitter",
            platformName: "Twitter",
            address: "",
          },
          {
            platform: "linkedin",
            platformName: "LinkedIn",
            address: "",
          },
          {
            platform: "mastodon",
            platformName: "Mastodon",
            address: "",
          },
        ],
      },
    ]

    it("transforms all profiles from DB as PublicProfiles", () => {
      const result = transformPublicProfiles({
        publicProfilesFromDB,
        socialLinksFromDB,
      })

      expect(result).toStrictEqual(expectedOutcome)
    })
  })

  describe("transformPublicProfile", () => {
    const expectedOutcome: PublicProfile = {
      id: "97e55ee6-831a-46f1-a0e0-dce2c817f711",
      about_text: "#About me",
      name: "Mirjam",
      username: "programmiri",
      avatar_url: "https://some-image.de/foo.png",
      social_links: [
        {
          platform: "website",
          platformName: "Website",
          address: "",
        },
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
          platform: "twitter",
          platformName: "Twitter",
          address: "Twitter Name",
        },
        {
          platform: "linkedin",
          platformName: "LinkedIn",
          address: "",
        },
        {
          platform: "mastodon",
          platformName: "Mastodon",
          address: "",
        },
      ],
    }

    it("transforms one profile from DB as PublicProfiles", () => {
      const result = transformPublicProfile({
        publicProfileFromDB: publicProfilesFromDB[0],
        socialLinksFromDB: socialLinksFromDB[0],
      })

      expect(result).toStrictEqual(expectedOutcome)
    })
  })
})
