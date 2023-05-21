import React, { ReactElement } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { getPublicAvatarUrl } from "../../../services/storage/avatar"

function AvatarImage({
  avatarUrl,
  width,
  height,
}: {
  avatarUrl: string | null | undefined
  width?: number
  height?: number
}): ReactElement {
  const avatarPublicUrl = avatarUrl ? getPublicAvatarUrl(avatarUrl) : null

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
            className="rounded"
          />
        </picture>
      ) : (
        <StaticImage
          src={"../../assets/images/avatar_placeholder.png"}
          alt={"Placeholder image"}
          width={100}
          placeholder="blurred"
          className="rounded"
        />
      )}
    </>
  )
}

export { AvatarImage }
