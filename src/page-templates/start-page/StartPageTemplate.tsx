import React, { ReactElement } from "react"
import { Conference } from "../../domain/conference/conference-interface"
import { ConferenceList } from "../../domain/conference/list/ConferenceList"
import { TextLink } from "../../ui-elements/text-link/TextLink"
import { Claim } from "../../ui-elements/claim/Claim"

function StartPageTemplate({
  conferences,
}: {
  conferences: Conference[]
}): ReactElement {
  return (
    <article className="container">
      <Claim />
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
        <h2 className="my-4">Upcoming Conferences</h2>
        <ConferenceList conferences={conferences} />
        <div className="text-center my-4">
          <TextLink
            to="/conference-list"
            internal={true}
            additionalClasses="fs-5"
          >
            See all conferences &rarr;
          </TextLink>
        </div>
      </section>
    </article>
  )
}

export { StartPageTemplate }
