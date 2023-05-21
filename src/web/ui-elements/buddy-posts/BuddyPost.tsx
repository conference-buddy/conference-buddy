import React, { ReactElement } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { TextLink } from "../text-link/TextLink"
import { formatDateString } from "../../../services/string-formatter/format-date"
import { getPublicAvatarUrl } from "../../../services/storage/avatar"
import { BuddyPostWithProfile } from "../../../domain/buddy-posts"

function BuddyPost({ post }: { post: BuddyPostWithProfile }): ReactElement {
  const formattedPostingDate = formatDateString(post.created_at)
  const avatarUrl = post.profile?.avatar_url
    ? getPublicAvatarUrl(post.profile.avatar_url)
    : null

  return (
    <div className="rounded bg-white mb-3 p-3 container">
      <div className="card-body">
        <div className="row">
          <div className="col-1">
            {avatarUrl ? (
              <picture>
                <img
                  src={avatarUrl}
                  alt={"Placeholder"}
                  width={80}
                  height={80}
                  placeholder="blurred"
                  className="rounded-circle"
                />
              </picture>
            ) : (
              <StaticImage
                src={"../../assets/images/avatar_placeholder.png"}
                alt={"Placeholder image"}
                width={100}
                placeholder="blurred"
                className="rounded-circle"
              />
            )}
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

            <div className="small text-end">
              <a href="/linknotexistingyet">edit entry</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { BuddyPost }
