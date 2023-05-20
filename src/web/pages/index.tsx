import React, { ReactElement } from "react"
import { PageHead } from "../ui-elements/page-layout/PageHead"
import { TextLink } from "../ui-elements/text-link/TextLink"
import { graphql } from "gatsby"
import { Conference } from "../../domain/conferences"
import { Claim } from "../ui-elements/claim/Claim"
import { ConferenceList } from "../ui-elements/conferences/list/ConferenceList"

type StartPageProps = {
  data: { allConference: { nodes: Conference[] } }
}
export default function IndexPage(props: StartPageProps): ReactElement {
  const conferences: Conference[] = props.data.allConference.nodes

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
          <TextLink to="/conferences" internal={true} additionalClasses="fs-5">
            See all conferences &rarr;
          </TextLink>
        </div>
      </section>
    </article>
  )
}

export const query = graphql`
  {
    allConference(sort: { start_date: ASC }, limit: 3) {
      nodes {
        id
        city
        country
        description
        end_date
        start_date
        url
        name
      }
    }
  }
`

export function Head() {
  return <PageHead title={"Welcome"} />
}
