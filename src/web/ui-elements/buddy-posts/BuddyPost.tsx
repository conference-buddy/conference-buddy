import React, { ReactElement } from "react"
import { TextLink } from "../text-link/TextLink"
import { formatDateString } from "../../../services/string-formatter/format-date"
import { BuddyPostWithProfile } from "../../../domain/buddy-posts"
import { AvatarImage } from "../profile/AvatarImage"

function BuddyPost({ post }: { post: BuddyPostWithProfile }): ReactElement {
  const formattedPostingDate = formatDateString(post.created_at)

  return (
    <div className="rounded bg-white mb-3 p-3 container">
      <div className="card-body">
        <div className="row">
          <div className="col-1">
            <AvatarImage avatarUrl={post.profile?.avatar_url}></AvatarImage>
          </div>
          <div className="col">
            <div className="d-flex justify-content-between">
              <TextLink to={`/user/${post.profile?.username}`} internal={true}>
                {post.profile?.username}
              </TextLink>
              <div className="text-dark text-opacity-75">
                💬 {formattedPostingDate}
              </div>
            </div>

            <p className="card-text pt-2">{post.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { BuddyPost }
