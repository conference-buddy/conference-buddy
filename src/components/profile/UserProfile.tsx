import React, { ReactElement } from "react"
import { Profile } from "../../domain/profile/profile-interface"
import useProfile from "../../hooks/useProfile"
import { useAuthUser } from "../../hooks/useAuthUser"

export const UserProfile = (): ReactElement => {
  const user = useAuthUser()

  const { data, isLoading } = useProfile(user) as {
    data: Profile
    isLoading: boolean
  }

  return (
    <div className="mb-5">
      <h2>My Profile</h2>
      {isLoading || !user ? null : (
        <>
          <div>{data?.first_name}</div>
          <div>{data?.last_name}</div>
        </>
      )}
    </div>
  )
}
