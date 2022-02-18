import React, { ReactElement } from "react"

type SocialLinkInputsProps = {
  onChange: (platform: string, value: string, index: number) => void
  disabled?: boolean
  //eslint-disable-next-line
  socialLinks: any[]
}

function SocialLinkInputs(props: SocialLinkInputsProps): ReactElement {
  const { disabled, onChange, socialLinks } = props

  const socialLinksForm = socialLinks?.map((availableSocialLink, index) => {
    const placeholder =
      availableSocialLink.linkForm === "username"
        ? "@yourusername"
        : "https://your-website.top"

    return (
      <div className="row mb-5" key={index}>
        <label className="form-label col-m-2 col-sm-3 col-form-label col-form-label-lg sr-only">
          {availableSocialLink.platform}
        </label>
        <div className="col-m-10 col-sm-9">
          <input
            disabled={disabled}
            type="text"
            className="form-control form-control-lg"
            onChange={e =>
              onChange(availableSocialLink.platform, e.target.value, index)
            }
            placeholder={placeholder}
          />
        </div>
      </div>
    )
  })

  return <>{socialLinksForm}</>
}

export { SocialLinkInputs }
