import React, { ReactElement, useEffect, useState } from "react"
import useCreateProfile from "../../../services/hooks/profile/useCreateProfile"
import { navigate } from "gatsby"
import useAuthUserContext from "../../../services/hooks/auth-user/useAuthUserContext"
import { SocialLink } from "../../../../domain/profiles/types/types-profiles"

export const CreateProfile = (): ReactElement => {
  const socialLinksAvailable = [{ twitter: "Twitter" }]
  const { authUser } = useAuthUserContext()
  const [name, setName] = useState(authUser?.user_metadata.full_name)
  const [username, setUsername] = useState(
    authUser?.user_metadata.preferred_username
  )
  const [socialLinks, setSocialLinks] =
    useState<SocialLink[]>(socialLinksAvailable)

  const updateSocialLink =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newArr = [...socialLinks]
      newArr[index] = { twitter: e?.target?.value }

      setSocialLinks(newArr)
    }

  useEffect(() => {
    console.log(socialLinks)
  })
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
    social_links: socialLinks,
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

        <label>
          Twitter
          <input
            type="text"
            onChange={updateSocialLink(0)}
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
