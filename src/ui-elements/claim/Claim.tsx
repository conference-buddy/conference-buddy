import React, { ReactElement } from "react"

function Claim(): ReactElement {
  return (
    <header>
      <h1 className="Claim my-3 my-md-5">
        <span className="Claim-text-wrapper">
          Let’s make conferences <br className="d-md-none" />
          more <span className="Claim-animation" />
        </span>
        <span className="visually-hidden text-nowrap">approachable</span>
        <br className="d-sm-none" />
        <br className="d-md-none" />
        <br className="d-none d-lg-block" />
        <strong className="Claim-text-wrapper">- one Buddy at a time</strong>.
      </h1>
    </header>
  )
}
export { Claim }
