import React from "react"
import { TextLink } from "../text-link/TextLink"
function Footer() {
  return (
    <footer
      className="bg-dark pt-4 pt-md-5 pb-3"
      role="contentinfo"
      aria-labelledby="aria-label-footer"
    >
      <div id="aria-label-footer" className="visually-hidden">
        Conference Buddy Footer
      </div>
      <div className="container text-white pb-2">
        <div className="row justify-content-evenly">
          <div className="col-12 col-md-3 text-center text-center">
            <h5 id="aria-label-nav-platform">Platform</h5>
            <nav aria-labelledby="aria-label-nav-platform">
              <ul className="list-unstyled">
                <li>
                  <TextLink internal={true} light={true} to="/">
                    <>How does this work?</>
                  </TextLink>
                </li>
                <li>
                  <TextLink internal={true} light={true} to="/">
                    <>Support ConfBuddy</>
                  </TextLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-12 col-md-3 text-center mt-3 mt-md-0">
            <h5 id="aria-label-nav-social" aria-hidden="true">
              Social
            </h5>

            <ul
              aria-label="Links to our social media"
              className="list-unstyled"
            >
              <li>
                <TextLink
                  internal={false}
                  light={true}
                  to="https://github.com/conference-buddy/"
                >
                  <>Github</>
                </TextLink>
              </li>
              <li>
                <TextLink
                  internal={false}
                  light={true}
                  to="https://hachyderm.io/@ConfBuddy"
                >
                  <>Mastodon</>
                </TextLink>
              </li>
              <li>
                <TextLink
                  internal={false}
                  light={true}
                  to="https://twitter.com/confbuddy"
                >
                  <>Twitter</>
                </TextLink>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-3 text-center mt-3 mt-md-0">
            <h5 id="aria-label-nav-about" aria-hidden="true">
              More
            </h5>

            <ul className="list-unstyled" aria-label="Misc links about us">
              <li>
                <TextLink
                  internal={false}
                  light={true}
                  to="https://www.iubenda.com/privacy-policy/44138766"
                >
                  <>Privacy Policy</>
                </TextLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="container small bg-dark text-light text-center">
        Made with ❤️ lots of ☕️ and an awesome ⌨️
      </div>
    </footer>
  )
}

export { Footer }
