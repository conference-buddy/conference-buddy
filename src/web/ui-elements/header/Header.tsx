import React, { ReactElement, useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import "../../assets/images/LogoConferenceBuddy.png"
import { SignIn } from "../sign-in/SignIn"
import { IconMenu2 } from "@tabler/icons-react"

function Header(): ReactElement {
  const [navBarOpen, setNavbarOpen] = useState(false)

  return (
    <header>
      <nav className="navbar navbar-expand-md bg-confbuddy-green">
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
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={navBarOpen}
            aria-label="Toggle navigation"
            onClick={() => setNavbarOpen(!navBarOpen)}
          >
            <IconMenu2 aria-hidden={"true"} color={"white"} />
          </button>
          <div
            className={`collapse navbar-collapse ${navBarOpen ? "show" : ""}`}
            id="navBar"
          >
            <ul
              className="navbar-nav d-flex align-items-center"
              style={{ width: "100%" }}
            >
              <li className="nav-item">
                <Link className="nav-link link-light" to={"/conferences"}>
                  Conferences
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link link-light"
                  activeClassName={"text-decoration-underline"}
                  to={"/"}
                >
                  How it works
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link link-light"
                  activeClassName={"text-decoration-underline"}
                  to={"/"}
                >
                  Feedback
                </Link>
              </li>
              <li className="nav-item flex-grow-1 d-flex justify-content-end my-3 my-md-0">
                <SignIn />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
export { Header }
