import React from "react"
import { PageLayout } from "../../ui-elements/page-layout/PageLayout"
import { TextLink } from "../../ui-elements/text-link/TextLink"

export default function NotFoundPage() {
  return (
    <PageLayout title="Profile">
      <div className="container">
        <h1>Page not found 🥺</h1>
        Go to the{" "}
        <TextLink internal={true} to={"/"}>
          startpage
        </TextLink>
        .
      </div>
    </PageLayout>
  )
}
