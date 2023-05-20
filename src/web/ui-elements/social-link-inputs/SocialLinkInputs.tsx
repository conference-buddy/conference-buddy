import React, { ReactElement } from "react"
import { SocialLink } from "../../../domain/_social-links/types/types-social-links"
import { TextInput } from "../text-input/TextInput"

type SocialLinksFieldsetProps = {
  onChange: (address: string | null, index: number) => void
  disabled?: boolean
  socialLinks: SocialLink[]
}

const socialLinkToIcon: Record<SocialLink["platform"], string> = {
  github: "🐙",
  gitlab: "🦊",
  mastodon: "🐘",
  linkedin: "👥",
  twitter: "🐦",
  website: "🌐",
}

function getSocialLinkIcon(platform: string | SocialLink["platform"]): string {
  return socialLinkToIcon.hasOwnProperty(platform)
    ? socialLinkToIcon[platform as SocialLink["platform"]]
    : ""
}

function SocialLinkInputs(props: SocialLinksFieldsetProps): ReactElement {
  const { disabled, onChange, socialLinks } = props

  const socialLinksForm = socialLinks?.map((availableSocialLink, index) => {
    const placeholder = "eg. https://social.media/username"

    return (
      <div className={"col-12 col-md-6"} key={index}>
        <TextInput
          type="url"
          value={availableSocialLink.address || ""}
          onChange={value => {
            onChange(value, index)
          }}
          label={
            <>
              <span aria-hidden={"true"}>
                {getSocialLinkIcon(availableSocialLink.platform)}
              </span>{" "}
              {availableSocialLink.platformName}{" "}
            </>
          }
          placeholder={placeholder}
          ariaDescription={"Please enter a valid url."}
          errorMessage={"Please enter a valid url."}
          disabled={disabled}
        />
      </div>
    )
  })

  return <div className="input-group mb-5 row">{socialLinksForm}</div>
}

export { SocialLinkInputs }
