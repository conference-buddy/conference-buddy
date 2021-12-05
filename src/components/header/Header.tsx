import React from "react"
import { StaticImage } from "gatsby-plugin-image"

function Header() {
  return (
    <header className="mb-3">
      <nav className="bg-confbuddy-green px-sm-4 py-2 px-2 d-flex justify-content-between">
        <div className="d-none d-sm-block d-flex align-items-center">
          <a href="/" title="Startpage">
            <StaticImage
              src="../../images/LogoConferenceBuddy_head_small.png"
              alt="Logo"
            />
          </a>
        </div>
      </nav>
    </header>
  )
}
export default Header
