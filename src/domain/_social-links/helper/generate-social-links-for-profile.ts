import { SocialLink, SocialLinksDB } from "../types/types-social-links"

const platformNameMap = {
  github: {
    name: "GitHub",
  },
  gitlab: {
    name: "GitLab",
  },
  mastodon: {
    name: "Mastodon",
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
  address,
}: {
  platform: keyof Omit<SocialLinksDB, "id">
  address: string
}): SocialLink {
  return {
    platform: platform,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    platformName: platformNameMap[platform].name,
    address: address,
  }
}

function generateSocialLinks(socialLinksFromDB: SocialLinksDB): SocialLink[] {
  return Object.keys(socialLinksFromDB).reduce((acc: SocialLink[], curr) => {
    const key = curr as keyof SocialLinksDB
    const value = socialLinksFromDB[key]
    // no value means that there is no username / address available.
    // in this case we don't want an entry for this social link
    // BUT gatsby graphql has problems handling optional fields
    // so until that's easier to do, set an empty string as value
    if (key !== "id") {
      const newLink = generateSocialLink({
        platform: key,
        address: value || "",
      })
      acc.push(newLink)
    }
    return acc
  }, [])
}

function generateEmptySocialLinks(): SocialLink[] {
  return Object.keys(platformNameMap).map(platform => {
    const platformName = platform as SocialLink["platform"]
    return generateSocialLink({ platform: platformName, address: "" })
  })
}

export { generateSocialLinks, generateEmptySocialLinks }
