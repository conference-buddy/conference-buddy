import React, { ReactElement, useEffect, useState } from "react"
import { ImageUpload } from "./ImageUpload"
import { getPublicAvatarUrl } from "../../../domain/profiles/api/avatar-api"
import useUpdateAvatar from "../../services/hooks/avatar/useUpdateAvatar"
import useDeleteAvatar from "../../services/hooks/avatar/useDeleteAvatar"

type AvatarUploadProps = {
  profileId: string
  avatarUrl: string | null
}

type ImageObject = {
  name: string
  file: any
}
function AvatarUpload(props: AvatarUploadProps): ReactElement {
  const [publicAvatarUrl, setPublicAvatarUrl] = useState<string | null>(null)
  const updateAvatar = useUpdateAvatar(props.profileId)
  const deleteAvatar = useDeleteAvatar(props.profileId)

  useEffect(() => {
    if (props.avatarUrl) {
      getPublicAvatarUrl(props.avatarUrl).then(setPublicAvatarUrl)
    }
  }, [props.avatarUrl])

  async function uploadImage(imageObject: ImageObject) {
    setPublicAvatarUrl(imageObject.name)
    updateAvatar.mutate({
      file: imageObject.file,
      avatarName: imageObject.name,
    })
  }

  async function deleteImage(imageUrl: string) {
    setPublicAvatarUrl(null)
    deleteAvatar.mutate({ avatarUrl: imageUrl })
  }

  return (
    <ImageUpload
      onFileAdded={uploadImage}
      onFileRemoved={deleteImage}
      imagePublicUrl={publicAvatarUrl}
    />
  )
}

export { AvatarUpload }
