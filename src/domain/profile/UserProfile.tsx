import React, { ReactElement } from "react"
import { ProfilePrivate } from "./profile-interface"
import useProfile from "../../services/hooks/profile/useProfile"

export const UserProfile = (): ReactElement => {
  const { data, isLoading } = useProfile() as {
    data: ProfilePrivate
    isLoading: boolean
  }

  return (
    <div className="mb-5">
      <h2>My Profile</h2>
      {isLoading || !data ? null : (
        <>
          <div>{data?.name}</div>
        </>
      )}
    </div>
  )
}
