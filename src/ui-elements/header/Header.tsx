import React, { ReactElement } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { SignIn } from "../../domain/sign-in/SignIn"

function Header(): ReactElement {
  return (
    <header className="mb-3">
      <nav className="bg-confbuddy-green px-sm-4 py-2 px-2 d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <Link to="/" title="Startpage">
            <StaticImage
              src="../../assets/images/LogoConferenceBuddy.png"
              alt="Conference Buddy logo"
              height={50}
              loading="eager"
              placeholder="none"
            />
          </Link>
          <div className="text-white d-block d-sm-none">Conference Buddy</div>
          <div className="text-white d-none d-sm-block fs-3">
            Conference Buddy
          </div>
        </div>
        <SignIn />
      </nav>
    </header>
  )
}
export { Header }
