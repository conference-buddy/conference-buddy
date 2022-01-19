import React, { ReactElement, useState } from "react"
import useCreateProfile from "../../../services/hooks/profile/useCreateProfile"
import { navigate } from "gatsby"
import useAuthUserContext from "../../../services/hooks/auth-user/useAuthUserContext"

export const CreateProfile = (): ReactElement => {
  const { authUser } = useAuthUserContext()
  const [name, setName] = useState(authUser?.user_metadata.full_name)
  const [username, setUsername] = useState(
    authUser?.user_metadata.preferred_username
  )

  //eslint-disable-next-line
  //@ts-ignore
  const createUserMutation = useCreateProfile({
    //eslint-disable-next-line
    //@ts-ignore
    id: authUser?.id,
    //eslint-disable-next-line
    //@ts-ignore
    email: authUser?.email,
    //eslint-disable-next-line
    //@ts-ignore
    provider: authUser?.app_metadata.provider,
    //eslint-disable-next-line
    //@ts-ignore
    name,
    //eslint-disable-next-line
    //@ts-ignore
    username,
  })

  if (createUserMutation.isSuccess) {
    navigate("/profile")
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
