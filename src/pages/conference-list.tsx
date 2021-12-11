import React, { ReactElement } from "react"
import { ConferencesListEntry } from "../components/conference/ConferencesListEntry"
import Layout from "../components/layout/Layout"
import { graphql } from "gatsby"
import { Conference } from "../domain/conference/conference-interface"
import { useState, useEffect } from "react"
import { supabase } from "../../supabaseClient"
import { User } from "@supabase/supabase-js"

export default function ConferenceList({
  data,
}: {
  data: {
    allMarkdownRemark: { nodes: Record<"frontmatter", Conference>[] }
  }
}): ReactElement {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    /* when the app loads, check to see if the user is signed in */
    checkUser()
    /* check user on OAuth redirect */
    window.addEventListener("hashchange", function () {
      checkUser()
    })
  }, [])

  function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }

  async function signInWithGithub() {
    await supabase.auth.signIn(
      {
        provider: "github",
      },
      {
        redirectTo: "http://localhost:8000/conference-list/",
      }
    )
  }
  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  const conferences: Conference[] = data.allMarkdownRemark.nodes.map(
    (entry: { frontmatter: Conference }) => {
      return { ...entry.frontmatter }
    }
  )

  const listItems = conferences.map((conference: Conference, index: number) => {
    return <ConferencesListEntry key={index} conference={conference} />
  })

  console.log(user)
  return (
    <Layout title="Conference List">
      <div className="mb-5">
        <h2>Login / Logout</h2>

        {user ? (
          <button onClick={signOut}>Sign out</button>
        ) : (
          <button onClick={signInWithGithub}>Sign In</button>
        )}
      </div>
      <div className="container">
        <ul className="list-group">{listItems}</ul>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    allMarkdownRemark {
      nodes {
        frontmatter {
          city
          country
          description
          endDate(formatString: "")
          startDate(formatString: "")
          tags
          title
          url
        }
      }
    }
  }
`
