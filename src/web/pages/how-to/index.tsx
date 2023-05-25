import React, { ReactElement } from "react"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import { TextLink } from "../../ui-elements/text-link/TextLink"
import { StaticImage } from "gatsby-plugin-image"

export default function HowToPage(): ReactElement {
  return (
    <div className="container">
      <div className={"mb-3"}>
        <TextLink internal={true} to={"/"}>
          Home
        </TextLink>
        <span className={"mx-1"}>/</span>
        <span>How to</span>
      </div>
      <h1>How to become a Conference Buddy</h1>
      <p>First: Thanks for wanting to become a Conference Buddy!</p>
      <div className="card mb-3">
        <div className={"card-body"}>
          <section className={"mb-4"}>
            <h3 className={"h5"}>1. Sign in and create a profile</h3>
            <p>
              We're using third part oAuth provider, for not GitHub and GitLab:{" "}
              <TextLink internal={true} to={"/sign-in"}>
                Sign in
              </TextLink>
            </p>
            <p>
              As soon as you're authenticated, you can{" "}
              <TextLink to="/profile/create" internal={true}>
                create a profile
              </TextLink>
              . Letting others know a bit more about yourself helps creating a
              trustful and safe environment for everybody.
            </p>

            <StaticImage
              aria-hidden={true}
              src="../../assets/images/create-profil.png"
              alt={"screenshot"}
              width={800}
              className="me-2"
            />
          </section>

          <section className={"mb-4"}>
            <h3 className={"h5"}>2. Become a Conference Buddy</h3>
            <p>
              On every conference detail page you can now see a button to become
              a Conference Buddy. You can add a post do become a buddy. This
              posts are only visible for people that are users with a profile.
            </p>
            <StaticImage
              aria-hidden={true}
              src="../../assets/images/become-confbuddy-1.png"
              alt={"screenshot"}
              width={800}
              className="me-2"
            />
            <br />
            <StaticImage
              aria-hidden={true}
              src="../../assets/images/become-confbuddy-2.png"
              alt={"screenshot"}
              width={800}
              className="me-2"
            />
          </section>

          <section className={"mb-4"}>
            <h3 className={"h5"}>3. Talk to other Conference Buddies</h3>
            <p>
              When you have created a post for the conference, you have access
              to the Buddy area. This area is only visible for users that added
              themselves as Conference Buddy to the same event.
            </p>
            <StaticImage
              aria-hidden={true}
              src="../../assets/images/buddy-area.png"
              alt={"screenshot"}
              width={800}
              className="me-2"
            />
          </section>

          <section className={"mb-4"}>
            <h3>Note</h3>
            <p>
              Conference Buddy is an alpha version right now. Features like
              notifications about new Buddies or posts in the Buddy area are
              planned, but not yet implemented.
            </p>
            <p>
              If you miss something dearly already or have ideas for great
              features, we very much would appreciate your{" "}
              <TextLink internal={true} to={"/feedback"}>
                feedback
              </TextLink>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export function Head() {
  return <PageHead title={"Sign in"} />
}
