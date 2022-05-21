import React, { ReactElement, useEffect, useState } from "react"
import { ImageObject, ImageUpload } from "./ImageUpload"
import { getPublicAvatarUrl } from "../../../domain/profiles/api/avatar-api"
import useUpdateAvatar from "../../services/hooks/avatar/useUpdateAvatar"
import useDeleteAvatar from "../../services/hooks/avatar/useDeleteAvatar"

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
    updateAvatar.mutate({
      file: imageObject.file,
      avatarName: imageObject.name,
    })
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
