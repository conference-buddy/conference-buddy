import React from "react"
import { TextLink } from "../../ui-elements/text-link/TextLink"
import { PageHead } from "../../ui-elements/page-layout/PageHead"

export default function NotFoundPage() {
  return (
    <div className="container">
      <h1>
        Page not found <span aria-hidden={"true"}>🥺</span>
      </h1>
      <p>We could not found the page you were looking for.</p>
      <TextLink internal={true} to={"/"}>
        Go to startpage
      </TextLink>
      .
    </div>
  )
}
export function Head() {
  return <PageHead title={"404"} />
}
