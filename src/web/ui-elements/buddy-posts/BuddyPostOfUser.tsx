import React, { ReactElement } from "react"
import { TextLink } from "../text-link/TextLink"
import { formatDateString } from "../../../services/string-formatter/format-date"

function BuddyPostOfUser({
  conferenceId,
  conferenceName,
  createdAt,
  text,
}: {
  conferenceId?: string | undefined
  conferenceName?: string | undefined
  createdAt: string
  text: string
}): ReactElement {
  const formattedPostingDate = formatDateString(createdAt)

  return (
    <div className="rounded bg-white mb-3 p-3 container">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between">
              {conferenceId && (
                <TextLink to={`/conference/${conferenceId}`} internal={true}>
                  {conferenceName}
                </TextLink>
              )}
              <div className="text-dark text-opacity-75">
                💬 {formattedPostingDate}
              </div>
            </div>

            <p className="card-text pt-2">{text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { BuddyPostOfUser }
