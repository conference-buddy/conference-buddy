import React, { ReactElement } from "react"
import { TextLink } from "../text-link/TextLink"
import { formatDateString } from "../../../services/string-formatter/format-date"
import { AvatarImage } from "../profile/AvatarImage"

function BuddyPost({
  avatarUrl,
  createdAt,
  text,
  username,
}: {
  avatarUrl?: string | null | undefined
  conferenceId?: string | undefined
  conferenceName?: string | undefined
  createdAt: string
  text: string
  username?: string | undefined
}): ReactElement {
  const formattedPostingDate = formatDateString(createdAt)

  return (
    <div className="rounded bg-white mb-3 p-3 container">
      <div className="card-body">
        <div className="row">
          {avatarUrl && (
            <div className="col-1">
              <AvatarImage avatarUrl={avatarUrl}></AvatarImage>
            </div>
          )}
          <div className="col">
            <div className="d-flex justify-content-between">
              <TextLink to={`/user/${username}`} internal={true}>
                {username}
              </TextLink>
              <div className="text-dark text-opacity-75">
                💬 {formattedPostingDate}
              </div>
            </div>

            <p className="card-text pt-2">{text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { BuddyPost }
