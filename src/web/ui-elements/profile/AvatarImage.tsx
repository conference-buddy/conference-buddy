import React, { ReactElement } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { getPublicAvatarUrl } from "../../../services/storage/avatar"

function AvatarImage({
  avatarUrl,
  width,
  height,
  circle,
}: {
  avatarUrl: string | null | undefined
  width?: number
  height?: number
  circle?: boolean
}): ReactElement {
  const avatarPublicUrl = avatarUrl ? getPublicAvatarUrl(avatarUrl) : null

  const imageClass = circle ? "rounded-circle" : "rounded"
  return (
    <>
      {avatarPublicUrl ? (
        <picture>
          <img
            src={avatarPublicUrl}
            alt={"Placeholder"}
            width={width || 80}
            height={height || 80}
            placeholder="blurred"
            className={`${imageClass} border border-3 border-primary bg-white`}
            style={{ objectFit: "cover" }}
          />
        </picture>
      ) : (
        <StaticImage
          src={"../../assets/images/avatar_placeholder.png"}
          alt={"Placeholder image"}
          width={80}
          placeholder="blurred"
          className={`${imageClass} border border-3 border-primary bg-white`}
          style={{ objectFit: "cover" }}
        />
      )}
    </>
  )
}

export { AvatarImage }
