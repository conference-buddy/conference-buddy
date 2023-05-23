import React, { ReactElement } from "react"
import { PageHead } from "../../../../ui-elements/page-layout/PageHead"
import { TextLink } from "../../../../ui-elements/text-link/TextLink"
import { BuddyArea } from "../../../../ui-elements/buddy-area/BuddyArea"
import { useConference } from "../../../../../services/hooks/conference/useConference"
import useProfile from "../../../../../services/hooks/profile/useProfile"

type BuddyAreaPageProps = {
  params: {
    id: string
  }
}

export default function Index({
  params,
}: BuddyAreaPageProps): ReactElement | null {
  const conferenceId = params.id
  const { data: conference } = useConference({ id: conferenceId })

  return (
    <div className="container">
      <h1>
        Buddy area -{" "}
        <TextLink internal={true} to={`/conference/${conferenceId}`}>
          {conference?.name}
        </TextLink>
      </h1>
      <div className={"mt-3"}>
        {params?.id && <BuddyArea conferenceId={params?.id} />}
      </div>
    </div>
  )
}

export function Head() {
  return <PageHead title={"Conference details"} />
}
