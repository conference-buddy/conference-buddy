import React, { ReactElement } from "react"
import { ImageUpload } from "./ImageUpload"
import {
  deleteAvatar,
  updateAvatarUrl,
  uploadAvatar,
} from "../../../domain/profiles/api/avatar-api"

type AvatarUploadProps = {
  profileId: string
  avatarUrl: string | null
}

type ImageObject = {
  name: string
  file: any
  dataUrl: string
}
function AvatarUpload(props: AvatarUploadProps): ReactElement {
  async function uploadImage(imageObject: ImageObject) {
    await uploadAvatar(imageObject)
    await updateAvatarUrl(props.profileId, imageObject.name)
  }

  async function deleteImage() {
    if (props.avatarUrl) {
      await deleteAvatar(props.avatarUrl)
      await updateAvatarUrl(props.profileId, null)
    }
  }

  return (
    <ImageUpload
      onFileAdded={uploadImage}
      onFileRemoved={deleteImage}
      image_url={props.avatarUrl}
    />
  )
}

export { AvatarUpload }
