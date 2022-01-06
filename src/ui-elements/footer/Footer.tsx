import React, { ReactElement } from "react"
import { TextLink } from "../text-link/TextLink"

function Footer(): ReactElement {
  return (
    <div className="bg-dark pt-4 pt-md-5 pb-3">
      <div className="container text-white pb-2">
        <div className="row justify-content-evenly">
          <div className="col-12 col-md-3 text-center text-center">
            <h5>Platform</h5>
            <nav>
              <ul className="list-unstyled">
                <li>
                  <TextLink internal={true} light={true} to={"/"}>
                    How does this work?
                  </TextLink>
                </li>
                <li>
                  <TextLink internal={true} light={true} to={"/"}>
                    Support ConfBuddy
                  </TextLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-12 col-md-3 text-center mt-3 mt-md-0">
            <h5>Social</h5>
            <nav>
              <ul className="list-unstyled">
                <li>
                  <TextLink
                    internal={false}
                    light={true}
                    to="https://www.iubenda.com/privacy-policy/44138766"
                  >
                    Twitter
                  </TextLink>
                </li>
                <li>
                  <TextLink
                    internal={false}
                    light={true}
                    to="https://www.iubenda.com/privacy-policy/44138766"
                  >
                    Github
                  </TextLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-12 col-md-3 text-center mt-3 mt-md-0">
            <h5>About</h5>
            <nav>
              <ul className="list-unstyled">
                <li>
                  <TextLink internal={false} light={true} to="">
                    Privacy Policy
                  </TextLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <footer>
        <div className="container small bg-dark text-light text-center">
          Made with ❤️ lots of ☕️ and an awesome ⌨️
        </div>
      </footer>
    </div>
  )
}

export { Footer }
