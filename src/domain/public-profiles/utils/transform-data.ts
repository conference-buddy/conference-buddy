import { createSocialLinks } from "../../_social-links/create-social-links-for-profile"
import { PublicProfile } from "../types/types-public-profile"
import { ProfileDB, SocialLinksDB } from "../../profiles/types/types-profiles"

//@TODO refactor
function transformPublicProfile(profileFromDB: ProfileDB): PublicProfile {
  return {
    created_at: profileFromDB.created_at,
    name: profileFromDB.name,
    username: profileFromDB.username,
  }
}

function transformPublicProfiles({
  profilesFromDB,
  socialLinksFromDB,
}: {
  profilesFromDB: ProfileDB[]
  socialLinksFromDB: SocialLinksDB[]
}): PublicProfile[] {
  return profilesFromDB.map((profile: ProfileDB) => {
    const socialLinks = socialLinksFromDB.find(socialLink => {
      return socialLink.id === profile.id
    })

    return {
      ...transformPublicProfile(profile),
      ...(socialLinks && { social_links: createSocialLinks(socialLinks) }),
    } as PublicProfile
  })
}

export { transformPublicProfiles, transformPublicProfile }
