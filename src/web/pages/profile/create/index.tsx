import React, { useEffect } from "react"
import { CreateProfile } from "../../../ui-elements/profile/create/CreateProfile"
import useProfile from "../../../../services/hooks/profile/useProfile"
import { navigate } from "gatsby"

export default function CreateProfilePage() {
  const { data: profile, isLoading } = useProfile()

  useEffect(() => {
    if (profile) {
      // in case a user navigates here who already
      // has a profile, redirect
      navigate("/profile")
      return
    }
  }, [isLoading, profile])

  return (
    <div className="container">
      <h2>Create new Profile</h2>
      <p>💜 Thank you for joining Conference Buddy! </p>
      <p>
        In order to make it more comfortable to find a Conference Buddy, we feel
        it is important that users offer at more information about them. Feel
        free to add as much information as you feel good with!
      </p>

      <div className="mt-5">
        <CreateProfile />
      </div>
    </div>
  )
}
