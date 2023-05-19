import React from "react"
import { TextLink } from "../../ui-elements/text-link/TextLink"
import { PageHead } from "../../ui-elements/page-layout/PageHead"

export function Head() {
  return (
    <div>
      <PageHead title={"404"} />
    </div>
  )
}

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
