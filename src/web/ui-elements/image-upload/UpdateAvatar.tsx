import React, { ReactElement } from "react"
import { ImageUpload } from "./ImageUpload"
import useUpdateAvatar from "../../../services/hooks/profile/useUpdateAvatar"
import { getPublicAvatarUrl } from "../../../services/storage/avatar"
import { ImageObject } from "../../../services/storage/create-image-object"
import useDeleteAvatar from "../../../services/hooks/profile/useDeleteAvatar"

type UpdateAvatarProps = {
  profileId: string
  avatarUrl: string | null
}

function UpdateAvatar(props: UpdateAvatarProps): ReactElement {
  const updateAvatar = useUpdateAvatar(props.profileId)
  const deleteAvatar = useDeleteAvatar(props.profileId)

  async function uploadImage(imageObject: ImageObject) {
    updateAvatar.mutate({ avatarFile: imageObject })
  }

  async function deleteImage() {
    if (props.avatarUrl) {
      deleteAvatar.mutate({ avatarUrl: props.avatarUrl })
    }
  }

  return (
    <ImageUpload
      onFileAdded={uploadImage}
      onFileRemoved={deleteImage}
      imagePublicUrl={props.avatarUrl && getPublicAvatarUrl(props.avatarUrl)}
    />
  )
}

export { UpdateAvatar }
