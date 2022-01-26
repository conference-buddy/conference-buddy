import { SocialLink, SocialLinksDB } from "../profiles/types/types-profiles"

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

export { createSocialLinks }
