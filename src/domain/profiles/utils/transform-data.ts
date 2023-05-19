import { ProfileDB } from "../types/types-profiles"
import { Profile } from "../types/types-profiles"
import { generateSocialLinks } from "../../_social-links/helper/generate-social-links-for-profile"
import { SocialLinksDB } from "../../_social-links/types/types-social-links"

function transformProfile({
  profileFromDB,
  socialLinksFromDB,
}: {
  profileFromDB: ProfileDB
  socialLinksFromDB: SocialLinksDB
}): Profile {
  const socialLinks = generateSocialLinks(socialLinksFromDB)
  if (profileFromDB.id === undefined) {
    throw Error("no profile id")
  }
  return {
    ...profileFromDB,
    social_links: socialLinks,
  }
}

export { transformProfile }
