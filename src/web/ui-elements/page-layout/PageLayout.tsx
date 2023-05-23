import React, { ReactElement, ReactNode } from "react"
import "../../assets/scss/main.scss"
import { Header } from "../header/Header"
import { Footer } from "../footer/Footer"
import { CreateProfileAlert } from "../profile/create/CreateProfileAlert"

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
          <main className="flex-grow-1 py-3 py-md-4">{children}</main>
        </div>
        <Footer />
      </div>
    </div>
  )
}
