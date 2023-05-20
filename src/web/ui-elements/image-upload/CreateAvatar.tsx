import React, { ReactElement, useState } from "react"
import { ImageObject } from "../../../services/storage/create-image-object"
import { ImageUpload } from "./ImageUpload"

type CreateAvatarProps = {
  onFileAdded: (imageObject: ImageObject) => void
  onFileRemoved: () => void
}

function CreateAvatar(props: CreateAvatarProps): ReactElement {
  const [imgUrl, setImageUrl] = useState<string | null>(null)

  async function uploadImage(imageObject: ImageObject) {
    setImageUrl(imageObject.dataUrl)
    props.onFileAdded(imageObject)
  }

  async function deleteImage() {
    setImageUrl(null)
    props.onFileRemoved()
  }

  return (
    <ImageUpload
      onFileAdded={uploadImage}
      onFileRemoved={deleteImage}
      imagePublicUrl={imgUrl}
    />
  )
}

export { CreateAvatar }
