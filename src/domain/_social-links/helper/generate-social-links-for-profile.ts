import { SocialLink, SocialLinksDB } from "../types/types-social-links"

const platformNameMap = {
  github: {
    name: "GitHub",
  },
  gitlab: {
    name: "GitLab",
  },
  instagram: {
    name: "Instagram",
  },
  linkedin: {
    name: "LinkedIn",
  },
  twitter: {
    name: "Twitter",
  },
  website: {
    name: "Website",
  },
}

function generateSocialLink({
  platform,
  value,
}: {
  platform: keyof Omit<SocialLinksDB, "id">
  value: string | undefined
}): SocialLink {
  return {
    platform: platform,
    platformName: platformNameMap[platform].name,
    linkForm: platform === "website" ? "url" : "username",
    value: value,
  }
}

function generateSocialLinks(socialLinksFromDB: SocialLinksDB): SocialLink[] {
  return Object.keys(socialLinksFromDB).reduce((acc: SocialLink[], curr) => {
    const key = curr as keyof SocialLinksDB
    const value = socialLinksFromDB[key]
    if (key !== "id") {
      const newLink = generateSocialLink({ platform: key, value })
      acc.push(newLink)
    }
    return acc
  }, [])
}

function generateEmptySocialLinks(): SocialLink[] {
  return Object.keys(platformNameMap).map(platform => {
    //@TODO wth is wrong here? tsc is fine, throws error in test run tho
    //eslint-disable-next-line
    //@ts-ignore
    return generateSocialLink({ platform, value: undefined })
  })
}

export { generateSocialLinks, generateEmptySocialLinks }
