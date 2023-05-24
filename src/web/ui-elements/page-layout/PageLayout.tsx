import React, { ReactElement, ReactNode } from "react"
import "../../assets/scss/main.scss"
import { Header } from "../header/Header"
import { Footer } from "../footer/Footer"
import { CreateProfileAlert } from "../profile/create/CreateProfileAlert"
import { IconInfoCircle } from "@tabler/icons-react"
import { Link } from "gatsby"

export default function PageLayout({
  children,
}: {
  children: ReactNode
}): ReactElement {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <div className="d-flex flex-column flex-grow-1">
        <div className="flex-grow-1">
          <CreateProfileAlert />

          <div className={"alert alert-info mb-0"}>
            <div
              className={
                "container d-block d-md-flex align-items-center justify-content-center"
              }
            >
              <IconInfoCircle aria-hidden={"true"} className={"me-2"} />
              <span>
                This is an alpha version. Not everything will work smoothly.{" "}
                <Link to={"/feedback"}>Feedback</Link> is appreciated!
              </span>
            </div>
          </div>
          <main className="flex-grow-1 py-3 py-md-4">{children}</main>
        </div>
        <Footer />
      </div>
    </div>
  )
}
