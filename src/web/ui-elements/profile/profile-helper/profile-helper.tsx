import { SocialLink } from "../../../../domain/_social-links/types/types-social-links"
import React from "react"
import {
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandLinkedin,
  IconBrandMastodon,
  IconBrandTwitter,
  IconWorld,
} from "@tabler/icons-react"

const socialLinksMap: Record<
  SocialLink["platform"],
  {
    name: SocialLink["platformName"]
    icon: () => React.ReactElement
    pattern: string
  }
> = {
  github: {
    name: "GitHub",
    icon: () => <IconBrandGithub aria-hidden="true" />,
    pattern: "https://github.com/username",
  },
  gitlab: {
    name: "GitLab",
    icon: () => <IconBrandGitlab color="#fc6d26" aria-hidden="true" />,
    pattern: "https://github.com/username",
  },
  mastodon: {
    name: "Mastodon",
    icon: () => <IconBrandMastodon color="#595aff" aria-hidden="true" />,
    pattern: "https://instance.io/@username",
  },
  linkedin: {
    name: "LinkedIn",
    icon: () => <IconBrandLinkedin color="#0A66C2" aria-hidden="true" />,
    pattern: "https://www.linkedin.com/in/username",
  },
  twitter: {
    name: "Twitter",
    icon: () => <IconBrandTwitter color="#1DA1F2" aria-hidden="true" />,
    pattern: "https://twitter.com/username",
  },
  website: {
    name: "Website",
    icon: () => <IconWorld aria-hidden="true" />,
    pattern: "you@email.provider",
  },
}
function getSocialLinkIcon(
  platform: string | SocialLink["platform"]
): () => React.ReactElement {
  return socialLinksMap.hasOwnProperty(platform)
    ? socialLinksMap[platform as SocialLink["platform"]].icon
    : () => <IconWorld aria-hidden="true" />
}

function getSocialLinkName(platform: string | SocialLink["platform"]): string {
  return socialLinksMap.hasOwnProperty(platform)
    ? socialLinksMap[platform as SocialLink["platform"]].name
    : ""
}

function getSocialLinkPattern(
  platform: string | SocialLink["platform"]
): string {
  return socialLinksMap.hasOwnProperty(platform)
    ? socialLinksMap[platform as SocialLink["platform"]].pattern
    : ""
}

export {
  socialLinksMap,
  getSocialLinkIcon,
  getSocialLinkName,
  getSocialLinkPattern,
}
