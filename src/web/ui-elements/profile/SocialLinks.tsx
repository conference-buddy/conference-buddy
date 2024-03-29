import React, { ReactElement } from "react"
import { SocialLink } from "../../../domain/_social-links/types/types-social-links"
import {
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandLinkedin,
  IconBrandMastodon,
  IconBrandTwitter,
  IconUserCircle,
  IconWorld,
} from "@tabler/icons-react"

function SocialLinks({
  socialLinks,
  username,
}: {
  socialLinks: SocialLink[] | undefined
  username: string
}): ReactElement {
  return (
    <>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
          <h6 className="mb-0">
            <IconUserCircle className="me-2" aria-hidden="true" />
            Username
          </h6>
          {username}
        </li>

        {socialLinks?.map((socialLink: SocialLink, index: number) => {
          if (!socialLink.address) return

          switch (socialLink.platform) {
            case "github":
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  key={index}
                >
                  <h6 className="mb-0">
                    <IconBrandGithub className="me-2" aria-hidden="true" />
                    {socialLink.platformName}
                  </h6>
                  <a href={socialLink.address} className="text-secondary">
                    {socialLink.address}
                  </a>
                </li>
              )
            case "gitlab":
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  key={index}
                >
                  <h6 className="mb-0">
                    <IconBrandGitlab
                      color="#fc6d26"
                      className="me-2"
                      aria-hidden="true"
                    />
                    {socialLink.platformName}
                  </h6>
                  <a href={socialLink.address} className="text-secondary">
                    {socialLink.address}
                  </a>
                </li>
              )
            case "mastodon":
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  key={index}
                >
                  <h6 className="mb-0">
                    <IconBrandMastodon
                      color="#595aff"
                      className="me-2"
                      aria-hidden="true"
                    />
                    {socialLink.platformName}
                  </h6>
                  <a href={socialLink.address} className="text-secondary">
                    {socialLink.address}
                  </a>
                </li>
              )
            case "twitter":
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  key={index}
                >
                  <h6 className="mb-0">
                    <IconBrandTwitter
                      color="#1DA1F2"
                      className="me-2"
                      aria-hidden="true"
                    />
                    {socialLink.platformName}
                  </h6>
                  <a href={socialLink.address} className="text-secondary">
                    {socialLink.address}
                  </a>
                </li>
              )
            case "website":
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  key={index}
                >
                  <h6 className="mb-0">
                    <IconWorld className="me-2" aria-hidden="true" />
                    {socialLink.platformName}
                  </h6>
                  <a href={socialLink.address} className="text-secondary">
                    {socialLink.address}
                  </a>
                </li>
              )
            case "linkedin":
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  key={index}
                >
                  <h6 className="mb-0">
                    <IconBrandLinkedin
                      color="#0A66C2"
                      className="me-2"
                      aria-hidden="true"
                    />
                    {socialLink.platformName}
                  </h6>
                  <a href={socialLink.address} className="text-secondary">
                    {socialLink.address}
                  </a>
                </li>
              )
            default:
              break
          }
        })}
      </ul>
    </>
  )
}

export { SocialLinks }
