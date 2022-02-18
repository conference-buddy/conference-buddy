import React, { ReactElement, useState } from "react"
import useCreateProfile from "../../../services/hooks/profile/useCreateProfile"
import { navigate } from "gatsby"
import useAuthUserContext from "../../../services/hooks/auth-user/useAuthUserContext"
import { TextInput } from "../../text-input/TextInput"
import { SocialLinkInputs } from "../../social-link-inputs/SocialLinkInputs"
import { generateEmptySocialLinks } from "../../../../domain/_social-links/helper/generate-social-links-for-profile"
import { SocialLink } from "../../../../domain/_social-links/types/types-social-links"

function CreateProfile(): ReactElement {
  const { authUser } = useAuthUserContext()
  const [name, setName] = useState(authUser?.user_metadata.full_name)
  const [username, setUsername] = useState(
    authUser?.user_metadata.preferred_username
  )
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    generateEmptySocialLinks()
  )

  const updateSocialLinks = (
    platform: string,
    value: string,
    index: number
  ) => {
    const newArray = [...socialLinks]
    newArray[index] = { [platform]: value } as SocialLink
    setSocialLinks(newArray)
  }

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
    <form
      onSubmit={event => {
        event.preventDefault()
        createUserMutation.mutate()
      }}
    >
      <TextInput
        onChange={e => setName(e.target.value)}
        label={"Full Name"}
        placeholder="Your full name"
        required={true}
      />

      <TextInput
        onChange={e => setUsername(e.target.value)}
        label={"Username"}
        placeholder="Your preferred username"
        required={true}
      />

      <SocialLinkInputs
        socialLinks={socialLinks}
        onChange={updateSocialLinks}
      />

      <div className="text-center">
        <button type="submit" className="btn btn-confbuddy-green">
          Submit Form
        </button>
      </div>
    </form>
  )
}

export { CreateProfile }
