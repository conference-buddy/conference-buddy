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
            <div className="col-sm-2 col-xl-1 order-2 order-sm-1">
              <AvatarImage
                avatarUrl={avatarUrl}
                circle={true}
                height={60}
                width={60}
              ></AvatarImage>
            </div>
          )}
          <div className="col-12 col-sm-10 col-xl-11 order-1 order-sm-2">
            <div className="d-flex justify-content-between mb-3">
              <TextLink to={`/user/${username}`} internal={true}>
                {username}
              </TextLink>
              <div className="text-dark text-opacity-75">
                <IconClockHour2 aria-hidden={true} /> {formattedPostingDate}
              </div>
            </div>
          </div>
          <div
            data-color-mode="light"
            className="col-12 offset-sm-2 col-sm-10 offset-xl-1 col-xl-11 order-3"
          >
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
  )
}

export { BuddyPost }
