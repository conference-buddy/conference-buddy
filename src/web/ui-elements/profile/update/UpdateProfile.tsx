import React, { ReactElement, useState } from "react"
import { Profile } from "../../../../domain/profiles"
import useUpdateProfile from "../../../../services/hooks/profile/useUpdateProfile"
import { TextInput } from "../../text-input/TextInput"
import { UpdateAvatar } from "../../image-upload/UpdateAvatar"

// @TODO implement update profile components
function UpdateProfile({ profile }: { profile: Profile }): ReactElement {
  const [name, setName] = useState(profile.name)
  const updateUserMutation = useUpdateProfile({
    ...profile,
    name,
  })

  if (updateUserMutation.isSuccess) {
    alert("success")
  }

  if (updateUserMutation.isError) {
    alert("error")
  }

  return (
    <div className="mb-5">
      <h2>Update Profile</h2>

      <div className="col-6 mt-5">
        <UpdateAvatar
          profileId={profile.id}
          avatarUrl={profile.avatar_url || null}
        />
      </div>

      <form
        onSubmit={event => {
          event.preventDefault()
          updateUserMutation.mutate()
        }}
      >
        <TextInput
          required
          errorMessage={"Please provide a name"}
          label={<>Full name</>}
          value={name || ""}
          type="text"
          onChange={setName}
          placeholder="Name"
        />
        <br />
        <br />
        <button type="submit" className="btn btn-primary">
          Submit Form
        </button>
      </form>
    </div>
  )
}

export { UpdateProfile }
