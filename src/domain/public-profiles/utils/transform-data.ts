import { PublicProfile, PublicProfileDB } from "../types/types-public-profile"
import {
  generateEmptySocialLinks,
  generateSocialLinks,
} from "../../_social-links/helper/generate-social-links-for-profile"
import { SocialLinksDB } from "../../_social-links/types/types-social-links"

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
  publicProfileFromDB,
  socialLinksFromDB,
}: {
  publicProfileFromDB: PublicProfileDB
  socialLinksFromDB: SocialLinksDB
}): PublicProfile {
  const socialLinks = socialLinksFromDB
    ? generateSocialLinks(socialLinksFromDB)
    : generateEmptySocialLinks()
  return {
    ...publicProfileFromDB,
    social_links: socialLinks,
  }
}

function transformPublicProfiles({
  publicProfilesFromDB,
  socialLinksFromDB,
}: {
  publicProfilesFromDB: PublicProfileDB[]
  socialLinksFromDB: SocialLinksDB[]
}): PublicProfile[] {
  return publicProfilesFromDB.map((profile: PublicProfileDB) => {
    return {
      ...profile,
      social_links: findSocialLinksForProfile({
        profileId: profile.id,
        allSocialLinks: socialLinksFromDB,
      }),
    } as PublicProfile
  })
}

export { transformPublicProfiles, transformPublicProfile }
