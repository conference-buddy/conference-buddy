import React, { ReactElement } from "react"
import { SocialLink } from "../../../domain/_social-links/types/types-social-links"

type SocialLinkInputsProps = {
  onChange: (value: string | undefined, index: number) => void
  disabled?: boolean
  socialLinks: SocialLink[]
}

const socialLinkToIcon: Record<string, string> = {
  github: "🐙",
  gitlab: "🦊",
  instagram: "📸",
  linkedin: "👥",
  twitter: "🐦",
  website: "🌐",
}

function getSocialLinkIcon(platform: string): string {
  return socialLinkToIcon.hasOwnProperty(platform)
    ? socialLinkToIcon[platform]
    : ""
}

function SocialLinkInputs(props: SocialLinkInputsProps): ReactElement {
  const { disabled, onChange, socialLinks } = props

  const socialLinksForm = socialLinks?.map((availableSocialLink, index) => {
    const placeholder =
      availableSocialLink.linkForm === "username"
        ? "@yourusername"
        : "https://your-website.top"

    return (
      <div className="mb-5 col-md-6" key={index}>
        <label className="form-label col-form-label-lg mb-0 text-capitalize">
          {getSocialLinkIcon(availableSocialLink.platform)}{" "}
          {availableSocialLink.platform}{" "}
        </label>
        <input
          disabled={disabled}
          type="text"
          className="form-control form-control-lg"
          onChange={e => onChange(e.target.value, index)}
          placeholder={placeholder}
        />
      </div>
    )
  })

  return <>{socialLinksForm}</>
}

export { SocialLinkInputs }
