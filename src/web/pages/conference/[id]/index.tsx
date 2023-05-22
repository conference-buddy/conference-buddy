import React, { ReactElement } from "react"
import { useConference } from "../../../../services/hooks/conference/useConference"
import { TextLink } from "../../../ui-elements/text-link/TextLink"
import { ConferenceSingle } from "../../../ui-elements/conferences/single/ConferenceSingle"
import { BuddyPosts } from "../../../ui-elements/buddy-posts/BuddyPosts"

// @TODO Loading information
export default function Id({
  params,
}: {
  params: Record<string, string>
}): ReactElement | null {
  const id = params.id

  const { data, isLoading } = useConference({ id })

  return (
    <div className="container">
      {!isLoading && !data && <p>Sorry, we could not find this conference.</p>}
      <div className="mb-3">
        <TextLink internal={true} to={"/conferences"}>
          &larr; Back to Conferences
        </TextLink>
      </div>
      {!isLoading && data && <ConferenceSingle conference={data} />}
      {!isLoading && data && <BuddyPosts conferenceId={data.id} />}
    </div>
  )
}
