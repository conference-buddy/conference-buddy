import React, { ReactElement } from "react"
import { Profile } from "../../domain/profile/profile-interface"
import useProfile from "../../hooks/useProfile"

export const UserProfile = (): ReactElement => {
  const { data, isLoading } = useProfile() as {
    data: Profile
    isLoading: boolean
  }

  return (
    <div className="mb-5">
      <h2>My Profile</h2>
      {isLoading || !data ? null : (
        <>
          <div>{data?.first_name}</div>
          <div>{data?.last_name}</div>
        </>
      )}
    </div>
  )
}
