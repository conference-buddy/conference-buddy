import React, { ReactElement } from "react"
import { TextLink } from "../text-link/TextLink"
import { formatDateString } from "../../../services/string-formatter/format-date"
import { AvatarImage } from "../profile/AvatarImage"
import { IconClockHour2 } from "@tabler/icons-react"
import MDEditor from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"

function BuddyPost({
  avatarUrl,
  createdAt,
  text,
  username,
}: {
  avatarUrl?: string | null | undefined
  conferenceId?: string | undefined
  conferenceName?: string | undefined
  createdAt: string
  text: string
  username?: string | undefined
}): ReactElement {
  const formattedPostingDate = formatDateString(createdAt)

  return (
    <div className="card mb-3 container">
      <div className="card-body">
        <div className="row">
          {avatarUrl && (
            <div className="col-1">
              <AvatarImage avatarUrl={avatarUrl}></AvatarImage>
            </div>
          )}
          <div className="col">
            <div className="d-flex justify-content-between mb-3">
              <TextLink to={`/user/${username}`} internal={true}>
                {username}
              </TextLink>
              <div className="text-dark text-opacity-75">
                <IconClockHour2 aria-hidden={true} /> {formattedPostingDate}
              </div>
            </div>

            <div data-color-mode="light">
              <MDEditor.Markdown
                source={text}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { BuddyPost }
