import React, { ReactElement } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import "../../assets/images/LogoConferenceBuddy.png"
import { SignIn } from "../sign-in/SignIn"

function Header(): ReactElement {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-confbuddy-green">
        <div className="container-fluid">
          <Link to="/" title="Startpage" className="navbar-brand d-flex">
            <span className="visually-hidden">Start page</span>
            <StaticImage
              src="../../assets/images/LogoConferenceBuddy.png"
              alt="Conference Buddy logo"
              height={50}
              loading="eager"
              placeholder="none"
              aria-hidden={true}
            />
            <span className="text-white d-block d-sm-none d-flex align-items-center">
              Conference Buddy
            </span>
            <span className="text-white d-none d-sm-block fs-3">
              Conference Buddy
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Conferences
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  How it works
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Feedback
                </a>
              </li>
              <SignIn />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
export { Header }
