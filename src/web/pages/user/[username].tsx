import React, { ReactElement } from "react"

export default function Username({
  params,
}: {
  params: Record<string, string>
}): ReactElement | null {
  const username = params.username
  return (
    <>
      <h1>this is dynamic user</h1>
      <h2>{username}</h2>
    </>
  )
}
