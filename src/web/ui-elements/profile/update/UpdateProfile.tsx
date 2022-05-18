import React, { ReactElement, useState } from "react"
import { Profile } from "../../../../domain/profiles"
import useUpdateProfile from "../../../services/hooks/profile/useUpdateProfile"
import { AvatarUpload } from "../../image-upload/AvatarUpload"

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

      <form
        onSubmit={event => {
          event.preventDefault()
          updateUserMutation.mutate()
        }}
      >
        <label>
          Full name
          <input
            required
            type="text"
            onChange={e => setName(e.target.value)}
            placeholder="Name"
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
      <div className="col-2 mt-5">
        <AvatarUpload
          profileId={profile.id}
          avatarUrl={profile.avatar_url || null}
        ></AvatarUpload>
      </div>
    </div>
  )
}

export { UpdateProfile }
