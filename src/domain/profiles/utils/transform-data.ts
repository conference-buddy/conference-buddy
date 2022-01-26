import { ProfileDB, SocialLinksDB } from "../types/types-profiles"
import { Profile } from "../types/types-profiles"
import { createSocialLinks } from "../../_social-links/create-social-links-for-profile"

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
