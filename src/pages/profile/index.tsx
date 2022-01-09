import React, { useEffect } from "react"
import { PageLayout } from "../../ui-elements/page-layout/PageLayout"
import useProfile from "../../services/hooks/profile/useProfile"
import { navigate } from "gatsby"

export default function ProfilePage() {
  const { data, isLoading } = useProfile()

  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/")
    }
  }, [data, isLoading])

  return (
    <PageLayout title="Profile">
      <div className="container">
        <h2>My Profile</h2>
        {data && !isLoading && <div>USER PAGE {data.name}</div>}
      </div>
    </PageLayout>
  )
}
