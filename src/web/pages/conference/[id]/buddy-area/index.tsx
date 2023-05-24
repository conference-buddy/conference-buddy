import React, { ReactElement } from "react"
import { PageHead } from "../../../../ui-elements/page-layout/PageHead"
import { TextLink } from "../../../../ui-elements/text-link/TextLink"
import { BuddyArea } from "../../../../ui-elements/buddy-area/BuddyArea"
import { useConference } from "../../../../../services/hooks/conference/useConference"
import useProfile from "../../../../../services/hooks/profile/useProfile"
import { navigate } from "gatsby"
import { useIsBuddy } from "../../../../../services/hooks/buddy-post/useBuddyPosts"

type BuddyAreaPageProps = {
  params: {
    id: string
  }
}

export default function Index({
  params,
}: BuddyAreaPageProps): ReactElement | null {
  const conferenceId = params.id
  const { data: conference, isLoading: isLoadingConference } = useConference({
    id: conferenceId,
  })
  const { data: profile, isLoading: isLoadingProfile } = useProfile()

  const { data: isBuddy, isLoading: isLoadingBuddy } = useIsBuddy(
    conferenceId,
    profile?.id
  )

  if (
    (!isLoadingConference && !conference) ||
    (!isLoadingProfile && !profile) ||
    (!isLoadingBuddy && !isBuddy)
  ) {
    navigate(`/conference/${conferenceId}`)
    return <></>
  }

  return (
    <>
      {params?.id && isBuddy && profile && (
        <div className="container flex-grow-1">
          <div className="mb-3">
            <TextLink internal={true} to={"/"}>
              Home
            </TextLink>
            <span className={"mx-1"}>/</span>
            <TextLink internal={true} to={"/conferences"}>
              Conferences
            </TextLink>
            <span className={"mx-1"}>/</span>
            <TextLink internal={true} to={`/conference/${conferenceId}`}>
              {conference?.name ? conference.name : "Details"}
            </TextLink>
            <span className={"mx-1"}>/</span>
            <span>Buddy area</span>
          </div>

          <BuddyArea
            conferenceId={params?.id}
            conferenceName={conference?.name}
            profile={profile}
          />
        </div>
      )}
    </>
  )
}

export function Head() {
  return <PageHead title={"Buddy area"} />
}
