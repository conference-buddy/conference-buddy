import React, { ReactElement } from "react"

function Claim(): ReactElement {
  return (
    <header>
      <div
        className="Claim h1 my-3 my-md-3"
        aria-hidden="true"
        data-testid={"claim-animation"}
      >
        <span className="Claim-text-wrapper">
          Let’s make conferences <br className="d-md-none" />
          more <span className="Claim-animation" />
        </span>
        <span className="visually-hidden text-nowrap">approachable</span>
        <br className="d-sm-none" />
        <br className="d-md-none" />
        <br className="d-none d-lg-block" />
        <strong className="Claim-text-wrapper">- one Buddy at a time</strong>.
      </div>
      <h1 className={"visually-hidden"}>
        Let’s make conferences more approachable, welcoming, inclusive,
        accessible and kind. One Buddy at a time.
      </h1>
    </header>
  )
}
export { Claim }
