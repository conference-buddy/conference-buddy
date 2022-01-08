import React, { ReactElement } from "react"

//eslint-disable-next-line
export const UserProfile = (props: any): ReactElement => {
  return <div>USER PAGE {props.profile?.name}</div>
}
