import React, { ReactElement } from "react"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import { IconFilePencil, IconId, IconMail } from "@tabler/icons-react"
import * as z from "zod"
import { FieldErrors, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextInput } from "../../ui-elements/text-input/TextInput"
import { TextArea } from "../../ui-elements/textarea/TextArea"
import { TextLink } from "../../ui-elements/text-link/TextLink"

export default function FeedbackPage(): ReactElement {
  return (
    <div className="container">
      <h1>Feedback</h1>
      <p>
        Conference Buddy grows in small iterations. Feedback about the current
        version is very much appreciated and helps the project to go in the best
        direction. ❤️
      </p>
      <div className={"row card mt-3"}>
        <div className={"card-body"}>
          <h2>Ways to give feedback</h2>
          <ul>
            <li>
              Technical problem? Open a{" "}
              <TextLink
                internal={false}
                to={
                  "https://github.com/conference-buddy/conference-buddy/issues/new"
                }
              >
                GitHub issue
              </TextLink>
              .
            </li>
            <li>
              Ideas for improvements? Questions about the app? Start a
              <TextLink
                internal={false}
                to={
                  "https://github.com/conference-buddy/conference-buddy/discussions/categories/ideas-for-features"
                }
              >
                GitHub discussion
              </TextLink>
              .
            </li>
            <li>
              General feedback? Make a post in the{" "}
              <TextLink
                internal={false}
                to={
                  "https://github.com/conference-buddy/conference-buddy/discussions/categories/feedback"
                }
              >
                GitHub feedback category
              </TextLink>
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export function Head() {
  return <PageHead title={"Sign in"} />
}
