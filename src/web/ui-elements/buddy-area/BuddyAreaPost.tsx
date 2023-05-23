import React from "react"
import usePublicProfile from "../../../services/hooks/public-profile/usePublicProfile"
import { AvatarImage } from "../profile/AvatarImage"
import { TextLink } from "../text-link/TextLink"
import { DiscussionPost } from "../../../domain/discussion/types/discussion-types"
import { formatDateString } from "../../../services/string-formatter/format-date"
import { Profile } from "../../../domain/profiles"

type BuddyAreaPostProp = {
  post: DiscussionPost
  currentProfile: Profile
  index: number
}
function BuddyAreaPost({ post, currentProfile }: BuddyAreaPostProp) {
  const { data: publicProfilePoster } = usePublicProfile({
    profileId: post.profile_id,
    enabled: true,
  })

  const currentProfileIsPoster = currentProfile.id === post.profile_id
  const flexDirection = currentProfileIsPoster ? "flex-row-reverse" : "flex-row"
  return (
    <div className={`row ${flexDirection}`}>
      <div className="col-2">
        <AvatarImage
          avatarUrl={publicProfilePoster?.avatar_url}
          circle={true}
        ></AvatarImage>
      </div>

      <div className="col-10 card p-0">
        <div className="card-header d-flex justify-content-between">
          {currentProfileIsPoster ? (
            <i>You</i>
          ) : (
            <TextLink to={`/user/`} internal={true}>
              {publicProfilePoster?.username}
            </TextLink>
          )}
          <div className="text-dark text-opacity-75">
            icon {formatDateString(post.created_at || "", true)}
          </div>
        </div>
        <div className={"card-body"}>
          <p className="card-text pt-2">{post.text}</p>
        </div>
      </div>
    </div>
  )
}

export { BuddyAreaPost }
;("")
