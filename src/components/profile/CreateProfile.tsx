import React, { ReactElement, useState } from "react"
import useCreateProfile from "../../hooks/useCreateProfile"
import { User } from "@supabase/supabase-js"

export const CreateProfile = ({
  authUser,
}: {
  authUser: User
}): ReactElement => {
  const [name, setName] = useState(authUser.user_metadata.full_name)
  const [username, setUsername] = useState(
    authUser.user_metadata.preferred_username
  )
  const [website, setWebsite] = useState<string | null>(null)

  const createUserMutation = useCreateProfile({
    //eslint-disable-next-line
    //@ts-ignore
    id: authUser.id,
    //eslint-disable-next-line
    //@ts-ignore
    email: authUser.email,
    //eslint-disable-next-line
    //@ts-ignore
    provider: authUser.app_metadata.provider,
    //eslint-disable-next-line
    //@ts-ignore
    name,
    //eslint-disable-next-line
    //@ts-ignore
    username,
    //eslint-disable-next-line
    //@ts-ignore
    website,
  })

  if (createUserMutation.isSuccess) {
    alert("success")
  }

  if (createUserMutation.isError) {
    alert("error")
  }

  return (
    <div className="mb-5">
      <h2>Create Profile</h2>

      <form
        onSubmit={event => {
          event.preventDefault()
          console.log(name)
          createUserMutation.mutate()
        }}
      >
        <label>
          Full name
          <input
            required
            type="text"
            onChange={e => setName(e.target.value)}
            placeholder="Full name"
          />
        </label>
        <br />
        <br />
        <label>
          Username
          <input
            required
            type="text"
            defaultValue={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
        </label>
        <br />
        <br />
        <label>
          Website
          <input
            type="text"
            onChange={e => setWebsite(e.target.value)}
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
    </div>
  )
}
