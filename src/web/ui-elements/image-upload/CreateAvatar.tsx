import React, { ReactElement } from "react"
import { ImageObject } from "../../../services/storage/create-image-object"
import { ImageUpload } from "./ImageUpload"

type CreateAvatarProps = {
  imageFile: ImageObject | undefined
  onChange: (imageFile: ImageObject | undefined) => void
}

function CreateAvatar({
  imageFile,
  onChange,
}: CreateAvatarProps): ReactElement {
  function uploadImage(imageObject: ImageObject) {
    onChange(imageObject)
  }

  async function deleteImage() {
    onChange(undefined)
  }

  return (
    <ImageUpload
      onFileAdded={uploadImage}
      onFileRemoved={deleteImage}
      imagePublicUrl={imageFile?.dataUrl || null}
      maxWidth={"300px"}
    />
  )
}

export { CreateAvatar }
