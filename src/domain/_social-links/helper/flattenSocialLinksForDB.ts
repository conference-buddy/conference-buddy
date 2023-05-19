import { SocialLink, SocialLinksDB } from "../types/types-social-links"

export function flattenSocialLinks(
  socialLinks: SocialLink[]
): Omit<SocialLinksDB, "id"> {
  // eslint-disable-next-line
  //@ts-ignore
  return socialLinks.reduce((acc, curr) => {
    const content = curr?.address?.length === 0 ? null : curr.address
    return { ...acc, [curr.platform]: content }
  }, {})
}
