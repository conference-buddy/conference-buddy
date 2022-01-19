import React, { ReactElement } from "react"
import { Conference } from "../../../domain/conferences/conference-interface"
import useConference from "../../services/hooks/conference/useConference"
import { TextLink } from "../../ui-elements/text-link/TextLink"
import { ConferenceSingle } from "../../ui-elements/conferences/single/ConferenceSingle"
import { PageLayout } from "../../ui-elements/page-layout/PageLayout"
import { BuddyPostList } from "../../ui-elements/buddy-posts/list/BuddyPostList"

export default function Id({
  params,
}: {
  params: Record<string, string>
}): ReactElement | null {
  const id = params.id

  const { data, isLoading, isError } = useConference(id) as {
    data: Conference
    isLoading: boolean
    isError: boolean
  }

  return (
    <PageLayout title="Conference Detail View">
      <div className="container">
        <div className="mb-3">
          <TextLink internal={true} to={"/conference-list"}>
            &larr; Back to Conferences
          </TextLink>
        </div>
        {isError && <div>There is no Conference with this ID.</div>}
        {!isLoading && !isError && <ConferenceSingle conference={data} />}
      </div>
      <BuddyPostList conferenceId={id} />
    </PageLayout>
  )
}
