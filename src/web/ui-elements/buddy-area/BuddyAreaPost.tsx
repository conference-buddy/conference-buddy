import React from "react"
import usePublicProfile from "../../../services/hooks/public-profile/usePublicProfile"
import { AvatarImage } from "../profile/AvatarImage"
import { TextLink } from "../text-link/TextLink"
import { DiscussionPost } from "../../../domain/discussion/types/discussion-types"
import { formatDateString } from "../../../services/string-formatter/format-date"
import { Profile } from "../../../domain/profiles"
import { IconClockHour2, IconClockHour3 } from "@tabler/icons-react"

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
    <div className={`d-flex ${flexDirection}`}>
      <div
        className={`${
          currentProfileIsPoster ? "ms-2" : "me-2"
        } d-none d-md-block`}
      >
        <AvatarImage
          avatarUrl={publicProfilePoster?.avatar_url}
          circle={true}
        ></AvatarImage>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between border-0">
          {currentProfileIsPoster ? (
            <i>You</i>
          ) : (
            <TextLink
              to={`/user/${publicProfilePoster?.username}`}
              internal={true}
            >
              {publicProfilePoster?.username}
            </TextLink>
          )}
          <div className="text-dark text-opacity-75 ms-3">
            <IconClockHour2 /> {formatDateString(post.created_at || "", true)}
          </div>
        </div>
        <div className={"card-body"}>
          <p className="card-text">{post.text}</p>
        </div>
      </div>
    </div>
  )
}

export { BuddyAreaPost }
