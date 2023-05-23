import React, { ReactElement } from "react"
import { PageHead } from "../../../../ui-elements/page-layout/PageHead"
import { TextLink } from "../../../../ui-elements/text-link/TextLink"
import { BuddyArea } from "../../../../ui-elements/buddy-area/BuddyArea"
import { useConference } from "../../../../../services/hooks/conference/useConference"

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
      <h1>Buddy area {conference?.name}</h1>
      <TextLink internal={true} to={`/conference/${conferenceId}`}>
        &larr; Back to conference
      </TextLink>
      <div className={"mt-3"}>
        {params?.id && <BuddyArea conferenceId={params?.id} />}
      </div>
    </div>
  )
}

export function Head() {
  return <PageHead title={"Buddy area"} />
}
