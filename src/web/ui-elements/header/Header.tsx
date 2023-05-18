import React, { ReactElement } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import "../../assets/images/LogoConferenceBuddy.png"

function Header(): ReactElement {
  return (
    <header>
      <nav className="bg-confbuddy-green px-sm-4 py-2 px-2 d-flex justify-content-between align-items-center">
        <div className="d-flex flex-grow-1 align-items-center">
          <Link to="/" title="Startpage">
            <span className="visually-hidden">Start page</span>
            <StaticImage
              src="../../assets/images/LogoConferenceBuddy.png"
              alt="Conference Buddy logo"
              height={50}
              loading="eager"
              placeholder="none"
              aria-hidden={true}
            />
          </Link>
          <div className="text-white d-block d-sm-none d-flex align-items-center">
            Conference Buddy
          </div>
          <div className="text-white d-none d-sm-block fs-3">
            Conference Buddy
          </div>
        </div>
      </nav>
    </header>
  )
}
export { Header }
