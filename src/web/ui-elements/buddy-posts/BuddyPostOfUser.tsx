import React, { ReactElement } from "react"
import { TextLink } from "../text-link/TextLink"
import { formatDateString } from "../../../services/string-formatter/format-date"
import { IconClockHour2 } from "@tabler/icons-react"
import MDEditor from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"

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
    <div className="row">
      <div className="col">
        <div className="d-flex justify-content-between mb-3">
          {conferenceId && (
            <TextLink to={`/conference/${conferenceId}`} internal={true}>
              {conferenceName}
            </TextLink>
          )}
          <div className="text-dark text-opacity-75">
            <IconClockHour2 aria-hidden={true} /> {formattedPostingDate}
          </div>
        </div>

        <div data-color-mode="light">
          <MDEditor.Markdown source={text} rehypePlugins={[rehypeSanitize]} />
        </div>
      </div>
    </div>
  )
}

export { BuddyPostOfUser }
