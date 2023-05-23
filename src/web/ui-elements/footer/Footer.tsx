import React from "react"
import { TextLink } from "../text-link/TextLink"
import {
  IconBrandGithub,
  IconBrandMastodon,
  IconBrandTwitter,
  IconSpy,
} from "@tabler/icons-react"
function Footer() {
  return (
    <footer
      className="bg-dark pt-4 pb-4"
      role="contentinfo"
      aria-labelledby="aria-label-footer"
    >
      <div id="aria-label-footer" className="visually-hidden">
        Conference Buddy Footer
      </div>
      <div className="container small bg-dark text-light d-flex flex-column flex-md-row justify-content-between">
        <ul
          className="list-unstyled d-flex m-0 text-center pb-5 pb-md-0"
          aria-label="Links to our social media"
        >
          <li className="me-3">
            <TextLink
              internal={false}
              light={true}
              to="https://github.com/conference-buddy/"
            >
              <IconBrandGithub /> Github
            </TextLink>
          </li>
          <li className="me-3">
            <TextLink
              internal={false}
              light={true}
              to="https://hachyderm.io/@ConfBuddy"
            >
              <IconBrandMastodon /> Mastodon
            </TextLink>
          </li>
          <li>
            <TextLink
              internal={false}
              light={true}
              to="https://twitter.com/confbuddy"
            >
              <IconBrandTwitter /> Twitter
            </TextLink>
          </li>
        </ul>
        <p className="m-0 pb-5 pb-md-0">
          Made with ❤️ lots of ☕️ and an awesome ⌨️
        </p>

        <ul
          className="list-unstyled m-0 pb-3 pb-md-0"
          aria-label="Misc links about us"
        >
          <li>
            <TextLink
              internal={false}
              light={true}
              to="https://www.iubenda.com/privacy-policy/44138766"
            >
              <IconSpy /> Privacy Policy
            </TextLink>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export { Footer }
