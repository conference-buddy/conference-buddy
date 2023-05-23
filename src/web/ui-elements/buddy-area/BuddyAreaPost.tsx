import React from "react"
import usePublicProfile from "../../../services/hooks/public-profile/usePublicProfile"
import { AvatarImage } from "../profile/AvatarImage"
import { TextLink } from "../text-link/TextLink"
import { DiscussionPost } from "../../../domain/discussion/types/discussion-types"
import { formatDateString } from "../../../services/string-formatter/format-date"

type BuddyAreaPostProp = {
  post: DiscussionPost
}
// @ts-ignore
function BuddyAreaPost({ post }: BuddyAreaPostProp) {
  const { data: profile } = usePublicProfile({
    profileId: post.profile_id,
    enabled: true,
  })

  return (
    <>
      <div className="row">
        <div className="col-3">
          <AvatarImage avatarUrl={profile?.avatar_url}></AvatarImage>
        </div>

        <div className="col-9">
          <div className="d-flex justify-content-between">
            <TextLink to={`/user/${profile?.username}`} internal={true}>
              {profile?.username}
            </TextLink>
            <div className="text-dark text-opacity-75">
              💬 {formatDateString(post.created_at)}
            </div>
          </div>

          <p className="card-text pt-2">{post.text}</p>
        </div>
      </div>
    </>
  )
}

export { BuddyAreaPost }
