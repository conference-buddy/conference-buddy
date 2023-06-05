import React from "react"
import { PageHead } from "../../../ui-elements/page-layout/PageHead"
import { TextLink } from "../../../ui-elements/text-link/TextLink"

export default function ConferenceAdd() {
  return (
    <div className="container">
      <div className="mb-3">
        <TextLink internal={true} to={"/"}>
          Home
        </TextLink>

        <span className={"mx-1"}>/</span>
        <TextLink internal={true} to={"/conferences"}>
          Conferences
        </TextLink>
        <span className={"mx-1"}>/</span>
        <span>Add conference</span>
      </div>
      <h1>Add a conference</h1>
      <p>
        Thank you for adding a conference! At the moment, we need to check the
        conferences manually before adding. Please fill out the form and we will
        take care of the rest!
      </p>
      <p>
        Please go here:
        <TextLink internal={false} to={"https://tally.so/r/mOlAlR"}>
          Tally form{" "}
        </TextLink>
      </p>
    </div>
  )
}

export function Head() {
  return <PageHead title={"Add conference"} />
}
