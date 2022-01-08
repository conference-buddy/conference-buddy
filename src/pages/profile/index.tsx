import React, { useEffect } from "react"
import { WrapperLayout } from "../../page-templates/wrapper-layout/WrapperLayout"
import useProfile from "../../services/hooks/profile/useProfile"
import { navigate } from "gatsby"
import { UserProfile } from "../../domain/profile/UserProfile"

export default function ProfilePage() {
  const { data, isLoading } = useProfile()

  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/")
    }
  }, [data, isLoading])

  return (
    <WrapperLayout title="Profile">
      <div className="mb-5">
        <h2>My Profile</h2>
        {data && !isLoading && <UserProfile profile={data} />}
      </div>
    </WrapperLayout>
  )
}
