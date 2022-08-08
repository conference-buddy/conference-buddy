import React, { ReactElement, useEffect, useState } from "react"
import { ImageUpload } from "./ImageUpload"
import { getPublicAvatarUrl } from "../../services/storage/avatar"
import useUpdateAvatar from "../../services/hooks/avatar/useUpdateAvatar"
import useDeleteAvatar from "../../services/hooks/avatar/useDeleteAvatar"
import { ImageObject } from "../../services/storage/image-upload-helper"

type UpdateAvatarProps = {
  profileId: string
  avatarUrl: string | null
}

function UpdateAvatar(props: UpdateAvatarProps): ReactElement {
  const [publicAvatarUrl, setPublicAvatarUrl] = useState<string | null>(null)
  const updateAvatar = useUpdateAvatar(props.profileId)
  const deleteAvatar = useDeleteAvatar(props.profileId)

  useEffect(() => {
    if (props.avatarUrl) {
      setPublicAvatarUrl(getPublicAvatarUrl(props.avatarUrl))
    }
  }, [props.avatarUrl])

  async function uploadImage(imageObject: ImageObject) {
    setPublicAvatarUrl(getPublicAvatarUrl(imageObject.name))
    updateAvatar.mutate({ avatarFile: imageObject })
  }

  async function deleteImage() {
    setPublicAvatarUrl(null)
    if (props.avatarUrl) {
      deleteAvatar.mutate({ avatarUrl: props.avatarUrl })
    }
  }

  return (
    <ImageUpload
      onFileAdded={uploadImage}
      onFileRemoved={deleteImage}
      imagePublicUrl={publicAvatarUrl}
    />
  )
}

export { UpdateAvatar }
