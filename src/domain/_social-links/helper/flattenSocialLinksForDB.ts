import { SocialLink, SocialLinksDB } from "../types/types-social-links"

export function flattenSocialLinks(
  socialLinks: SocialLink[]
): Omit<SocialLinksDB, "id"> {
  return socialLinks.reduce((acc, curr) => {
    return { ...acc, [curr.platform]: curr.value }
  }, {})
}
