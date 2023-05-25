import React, { ReactElement } from "react"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import { TextLink } from "../../ui-elements/text-link/TextLink"

export default function CodeOfConduct(): ReactElement {
  return (
    <div className="container">
      <div className={"mb-3"}>
        <TextLink internal={true} to={"/"}>
          Home
        </TextLink>
        <span className={"mx-1"}>/</span>
        <span>Code of Conduct</span>
      </div>

      <h1>Code of Conduct</h1>
      <div className={"card mt-3 mb-3"}>
        <div className={"card-body"}>
          <h2>Our Pledge</h2>
          <p>
            Conference Buddy is committed to providing an inclusive and
            respectful environment for all participants. We pledge to ensure
            that everyone can engage in our project and community without
            experiencing harassment or discrimination based on age, body size,
            disability, ethnicity, gender identity and expression, level of
            experience, nationality, personal appearance, race, religion, or
            sexual identity and orientation.
          </p>
          <h3>Our Standards</h3>
          <p>
            To foster a positive and welcoming environment, we encourage the
            following behaviors:
          </p>
          <ul>
            <li>Using inclusive and welcoming language.</li>
            <li>Respecting diverse viewpoints and experiences.</li>
            <li>
              Referring to individuals by their preferred pronouns and using
              gender-neutral pronouns when unsure.
            </li>
            <li>Accepting constructive criticism gracefully.</li>
            <li>Prioritizing the best interests of the community.</li>
            <li>Showing empathy towards fellow community members.</li>
          </ul>
          Unacceptable behavior includes:
          <ul>
            <li>
              Using sexualized language or imagery and engaging in unwelcome
              sexual attention or advances.
            </li>
            <li>
              Engaging in trolling, making insulting or derogatory comments, and
              launching personal or political attacks.
            </li>
            <li>Engaging in public or private harassment.</li>
            <li>
              Publishing others' private information, such as physical or
              electronic addresses, without explicit permission.
            </li>
            <li>
              Engaging in conduct that could reasonably be considered
              inappropriate within a professional setting.
            </li>
            <li>Dismissing or attacking requests for inclusion.</li>
          </ul>
          We pledge to prioritize the safety of marginalized individuals over
          the comfort of privileged individuals. We will not act on complaints
          regarding:
          <ul>
            <li>
              'Reverse' -isms, including 'reverse racism,' 'reverse sexism,' and
              'cisphobia.'
            </li>
            <li>
              Reasonable communication of boundaries, such as 'Don't talk to
              me,', 'Go away,' or 'I'm not discussing this with you.'
            </li>
            <li>
              Someone's refusal to explain or debate social justice concepts.
            </li>
            <li>
              Criticisms of racist, sexist, cissexist, or otherwise oppressive
              behavior or assumptions.
            </li>
          </ul>
          <h3>Enforcement</h3>
          <p>
            Violations of the Code of Conduct can be reported by sending an
            email to mirjam@conferencebuddy.io. All reports will be thoroughly
            reviewed and investigated, and appropriate actions will be taken
            based on the circumstances.
          </p>
          <p>
            The Conference Buddy community creator has the authority to remove
            comments or contributions that do not align with this Code of
            Conduct. They may also temporarily or permanently suspend members
            for behaviors they deem inappropriate, threatening, offensive, or
            harmful.
          </p>
          <h4>Attribution</h4>
          This Code of Conduct is adapted from:
          <ul>
            <li>
              {" "}
              <TextLink
                internal={false}
                to={
                  "https://www.contributor-covenant.org/version/1/4/code-of-conduct/"
                }
              >
                Contributor Covenant, version 1.4
              </TextLink>
            </li>
            <li>
              {" "}
              <TextLink internal={false} to={"https://dev.to/code-of-conduct"}>
                DEV community
              </TextLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export function Head() {
  return <PageHead title={"Code of Conduct"} />
}
