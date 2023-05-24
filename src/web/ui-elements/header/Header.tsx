import React, { ReactElement, useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import "../../assets/images/LogoConferenceBuddy.png"
import { SignIn } from "../sign-in/SignIn"
import { IconMenu2 } from "@tabler/icons-react"
import useProfile from "../../../services/hooks/profile/useProfile"
import { useAuthUserContext } from "../../../services/hooks/auth-user/useAuthUserContext"

function Header(): ReactElement {
  const [navBarOpen, setNavbarOpen] = useState(false)
  const { authUser, isLoading: isLoadingAuthUser } = useAuthUserContext()
  const { data: profile, isLoading: isLoadingProfile } = useProfile()

  function generateProfileLink() {
    if (isLoadingAuthUser || isLoadingProfile) {
      return <></>
    }

    if (authUser && !profile) {
      return (
        <Link className="nav-link link-light" to={"/profile/create"}>
          Create profile
        </Link>
      )
    }

    if (authUser && profile) {
      return (
        <Link className="nav-link link-light" to={"/profile"}>
          Profile
        </Link>
      )
    }
    return <></>
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md bg-confbuddy-green p-1">
        <div className="container-fluid d-flex">
          <Link to="/" title="Startpage" className="navbar-brand d-flex me-5">
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
                <Link
                  className="nav-link link-light"
                  activeClassName={"text-decoration-underline"}
                  to={"/conferences"}
                >
                  Conferences
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link link-light"
                  activeClassName={"text-decoration-underline"}
                  to={"/does-not-exist-yet-2"}
                >
                  How it works
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link link-light"
                  activeClassName={"text-decoration-underline"}
                  to={"/feedback"}
                >
                  Feedback
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link link-light"
                  activeClassName={"text-decoration-underline"}
                  to={"/does-not-exist-yet-3"}
                >
                  Code of Conduct
                </Link>
              </li>
              <span
                className={
                  "flex-grow-1 d-flex align-items-center justify-content-end my-3 my-md-0"
                }
              >
                <li className="nav-item me-3">{generateProfileLink()}</li>
                <li className="nav-item">
                  <SignIn />
                </li>
              </span>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
export { Header }
