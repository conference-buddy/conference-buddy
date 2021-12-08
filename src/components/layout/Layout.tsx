import React, { ReactElement } from "react"
import Helmet from "react-helmet"
import Header from "../header/Header"
import Footer from "../footer/Footer"

const ogImage = "https://i.imgur.com/aOqP2xB.jpg"

const Layout = ({
  children,
  title,
}: {
  children: ReactElement
  title: string
}): ReactElement => (
  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta
        name="description"
        content="Conference Buddy is for everyone who wants to attend a tech conference but is afraid to go alone. It's for everyone at conferences  who is not comfortable being on their own all the time.  Let's make tech events more approachable!"
      />
      <meta name="image" content={ogImage} />
      <meta
        name="keywords"
        content="tech conference, conference, tech events, programming, developing, programmer, developer, software development, software engineering, open space, barcamp, meetup, coding, coding conference"
      />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="Mirjam Aulbach" />

      <meta itemProp="name" content="Conference Buddy" />
      <meta
        itemProp="description"
        content="Conference Buddy is for everyone who wants to attend a tech conference but is afraid to go alone. It's for everyone at conferences  who is not comfortable being on their own all the time.  Let's make tech events more approachable!"
      />
      <meta itemProp="image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Conference Buddy" />
      <meta
        name="twitter:description"
        content="Conference Buddy is for everyone who wants to attend a tech conference but is afraid to go alone. It's for everyone at conferences  who is not comfortable being on their own all the time.  Let's make tech events more approachable!"
      />
      <meta name="twitter:site" content="@ConfBuddy" />
      <meta name="twitter:creator" content="@mirjam_diala" />
      <meta name="twitter:image" content={ogImage} />

      <meta name="og:title" content="Conference Buddy" />
      <meta
        name="og:description"
        content="Conference Buddy is for everyone who wants to attend a tech conference but is afraid to go alone. It's for everyone at conferences  who is not comfortable being on their own all the time.  Let's make tech events more approachable!"
      />
      <meta name="og:image" content={ogImage} />
      <meta name="og:url" content="https://www.conferencebuddy.io/" />
      <meta name="og:site_name" content="Conference Buddy" />
      <meta name="og:locale" content="en_US" />
      <meta name="og:type" content="website" />

      <link rel="canonical" href={`https://conferencebuddy.io/`} />
      <html lang="en" />
    </Helmet>

    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  </div>
)

export default Layout
