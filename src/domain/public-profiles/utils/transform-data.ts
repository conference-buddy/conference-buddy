import { PublicProfile } from "../types/types-public-profile"
import { ProfileDB } from "../../profiles/types/types-profiles"
import {
  generateEmptySocialLinks,
  generateSocialLinks,
} from "../../_social-links/helper/generate-social-links-for-profile"
import { SocialLinksDB } from "../../_social-links/types/types-social-links"

function mapProfileToPublicProfile(
  profileFromDB: ProfileDB
): Omit<PublicProfile, "social_links"> {
  return {
    created_at: profileFromDB.created_at,
    name: profileFromDB.name,
    username: profileFromDB.username,
  }
}

function findSocialLinksForProfile({
  profileId,
  allSocialLinks,
}: {
  profileId: string
  allSocialLinks: SocialLinksDB[]
}) {
  const socialLinks = allSocialLinks.find(socialLink => {
    return socialLink.id === profileId
  })
  return socialLinks
    ? generateSocialLinks(socialLinks)
    : generateEmptySocialLinks()
}

function transformPublicProfile({
  profileFromDB,
  socialLinksFromDB,
}: {
  profileFromDB: ProfileDB
  socialLinksFromDB: SocialLinksDB
}): PublicProfile {
  const socialLinks = socialLinksFromDB
    ? generateSocialLinks(socialLinksFromDB)
    : generateEmptySocialLinks()
  return {
    ...mapProfileToPublicProfile(profileFromDB),
    social_links: socialLinks,
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
    return {
      ...mapProfileToPublicProfile(profile),
      social_links: findSocialLinksForProfile({
        profileId: profile.id,
        allSocialLinks: socialLinksFromDB,
      }),
    } as PublicProfile
  })
}

export { transformPublicProfiles, transformPublicProfile }
