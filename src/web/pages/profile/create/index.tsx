import React, { useEffect } from "react"
import { CreateProfile } from "../../../ui-elements/profile/create/CreateProfile"
import useProfile from "../../../../services/hooks/profile/useProfile"
import { navigate } from "gatsby"
import { useAuthUserContext } from "../../../../services/hooks/auth-user/useAuthUserContext"

export default function CreateProfilePage() {
  const { data: profile, isLoading } = useProfile()
  const { authUser } = useAuthUserContext()

  useEffect(() => {
    if (profile || !authUser) {
      // in case a user navigates here who already
      // has a profile or is not authenticated
      navigate("/profile")
      return
    }
  }, [isLoading, profile, authUser])

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
        {!profile && authUser && <CreateProfile authUser={authUser} />}
      </div>
    </div>
  )
}
