import { ProfileDB, SocialLink, SocialLinksDB } from "../types/types-profiles"
import { Profile } from "../types/types-profiles"

function createSocialLinks(
  socialLinksFromDB: SocialLinksDB
): SocialLink[] | null {
  const links = Object.keys(socialLinksFromDB).reduce(
    (acc: SocialLink[], curr) => {
      const key = curr as keyof SocialLinksDB
      const value = socialLinksFromDB[key]
      if (key !== "id" && !!value) {
        acc.push({ [key]: value } as SocialLink)
      }
      return acc
    },
    []
  )
  return links.length > 0 ? links : null
}

function transformProfile({
  profileFromDB,
  socialLinksFromDB,
}: {
  profileFromDB: ProfileDB
  socialLinksFromDB: SocialLinksDB
}): Profile {
  const socialLinks = createSocialLinks(socialLinksFromDB)
  if (profileFromDB.id === undefined) {
    throw Error("no profile id")
  }
  return {
    ...profileFromDB,
    ...(socialLinks && { social_links: socialLinks }),
  }
}

export { transformProfile }
