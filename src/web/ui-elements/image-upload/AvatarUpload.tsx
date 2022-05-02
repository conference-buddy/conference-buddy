import React, { ReactElement } from "react"
import { ImageUpload } from "./ImageUpload"
import {
  deleteAvatar,
  updateAvatarUrl,
} from "../../../domain/profiles/api/avatar-api"

interface AvatarUploadProps {
  profileId: string
  avatarUrl: string | null
}

function AvatarUpload(props: AvatarUploadProps): ReactElement {
  async function uploadAvatar(imageObject: any) {
    if (imageObject && imageObject.name) {
      await uploadAvatar(imageObject)
      await updateAvatarUrl(props.profileId, imageObject.name)
    }
  }

  async function deleteAvatarImage() {
    if (props.avatarUrl) {
      await deleteAvatar(props.avatarUrl)
      await updateAvatarUrl(props.profileId, null)
    }
  }

  return (
    <ImageUpload
      onFileAdded={uploadAvatar}
      onFileRemoved={deleteAvatarImage}
      image_url={props.avatarUrl}
    ></ImageUpload>
  )
}

export { AvatarUpload }
