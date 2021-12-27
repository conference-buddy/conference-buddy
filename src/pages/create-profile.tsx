import React, { ReactElement, useEffect, useState } from "react"
import { Layout } from "../components/layout/Layout"
import useCreateProfile from "../hooks/useCreateProfile"
import { Profile } from "../domain/profile/profile-interface"
import { supabase } from "../../supabaseClient"
import { User } from "@supabase/supabase-js"

export default function CreateProfile(): ReactElement {
  const [user, setUser] = useState<User | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    checkUser()
  }, [])

  function checkUser() {
    const user = supabase.auth.user()
    if (user) {
      setUser(user)
    }
  }

  const createUserMutation = useCreateProfile({
    //eslint-disable-next-line
    //@ts-ignore
    id: user?.id,
    first_name: firstName,
    last_name: lastName,
    username: username,
  } as Profile)

  if (createUserMutation.isSuccess) {
    alert("success")
  }

  if (createUserMutation.isError) {
    alert("error")
  }

  return (
    <Layout title="Conference List">
      <div className="mb-5">
        <h2>Create Profile</h2>
        {!user ? null : (
          <form
            onSubmit={event => {
              event.preventDefault()
              createUserMutation.mutate()
              console.log(username)
            }}
          >
            <label>
              First name
              <input
                type="text"
                onChange={e => setFirstName(e.target.value)}
                placeholder="First name"
              />
            </label>
            <br />
            <label>
              Last name
              <input
                type="text"
                onChange={e => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </label>
            <br />
            <label>
              Username
              <input
                type="text"
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
              />
            </label>
            <br />
            <button
              type="submit"
              className="bg-blue-500 text-white px-8 py-2 rounded w-full"
            >
              Submit Form
            </button>
          </form>
        )}
      </div>
    </Layout>
  )
}
