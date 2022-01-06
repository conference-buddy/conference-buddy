import React, { ReactElement } from "react"
import { Conference } from "../../domain/conference/conference-interface"
import { ConferenceList } from "../../domain/conference/list/ConferenceList"
import { TextLink } from "../text-link/TextLink"

function StartPage({
  conferences,
}: {
  conferences: Conference[]
}): ReactElement {
  return (
    <article className="container">
      <header>
        <h1 className="display-1">Conference Buddy</h1>
        <p className="lead">
          Let’s make tech events more approachable -{" "}
          <em>one Buddy at a time</em>.
        </p>
      </header>

      <p>
        Conference Buddy provides a platform to find{" "}
        <strong>companions for tech conferences</strong>. You can look for one
        or more person with whom you can attend a conference{" "}
        <strong>together</strong>. Support each other, find a familiar face
        between all these strangers. You will feel more at ease and comfortable
        just knowing you’re not alone. At the same time, you have the
        opportunity to <strong>help others</strong> to feel better!
      </p>
      <h2>How does this work?</h2>
      <p>
        You can find a detailed explanation how to use Conference Buddy here:
        How does this work?
      </p>

      <section>
        <h2>Upcoming Conferences</h2>
        <ConferenceList conferences={conferences} />
        <TextLink to="/conference-list" internal={true}>
          See all conferences
        </TextLink>
      </section>
    </article>
  )
}

export { StartPage }
