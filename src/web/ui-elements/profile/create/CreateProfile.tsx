import React, { ReactElement, useEffect, useState } from "react"
import useCreateProfile from "../../../services/hooks/profile/useCreateProfile"
import { navigate } from "gatsby"
import useAuthUserContext from "../../../services/hooks/auth-user/useAuthUserContext"
import { SocialLink } from "../../../../domain/profiles/types/types-profiles"
import { TextInput } from "../../text-input/TextInput"
import { SocialLinkInputs } from "../../social-link-inputs/SocialLinkInputs"
import { platform } from "os"

const socialLinkFormMap = [
  { platform: "website", platformName: "Website", linkForm: "url" },
  { platform: "github", platformName: "Github", linkForm: "username" },
  { platform: "gitlab", platformName: "Gitlab", linkForm: "username" },
  { platform: "instagram", platformName: "Instagram", linkForm: "username" },
  { platform: "linkedin", platformName: "LinkedIn", linkForm: "username" },
  { platform: "twitter", platformName: "Twitter", linkForm: "username" },
]

const socialLinksStart = socialLinkFormMap.map(entry => {
  return { [entry.platform]: undefined }
})

// @TODO split functionality/components to build social links
function CreateProfile(): ReactElement {
  const { authUser } = useAuthUserContext()
  const [name, setName] = useState(authUser?.user_metadata.full_name)
  const [username, setUsername] = useState(
    authUser?.user_metadata.preferred_username
  )
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(socialLinksStart)

  const updateSocialLinks = (
    platform: string,
    value: string,
    index: number
  ) => {
    const newArray = [...socialLinks]
    newArray[index] = { [platform]: value }
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
        socialLinkFormMap={socialLinkFormMap}
        onChange={updateSocialLinks}
      />

      {/*<div className="row mb-5">*/}
      {/*  /!*eslint-disable-next-line*!/*/}
      {/*  <label className="form-label col-m-2 col-sm-3 col-form-label col-form-label-lg">*/}
      {/*    Twitter*/}
      {/*  </label>*/}
      {/*  <div className="col-m-10 col-sm-9">*/}
      {/*    <input*/}
      {/*      type="text"*/}
      {/*      className="form-control form-control-lg"*/}
      {/*      onChange={updateSocialLink(0)}*/}
      {/*      placeholder="Twitter"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="text-center">
        <button type="submit" className="btn btn-confbuddy-green">
          Submit Form
        </button>
      </div>
    </form>
  )
}

export { CreateProfile }
