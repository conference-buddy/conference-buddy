import React, { ReactElement, useEffect, useState } from "react"
import { getPublicAvatarUrl } from "../../../domain/profiles/api/avatar-api"

type ImageUploadProps = {
  onFileAdded: (imgObject: ImageObject) => void
  onFileRemoved: () => void
  image_url: string | null
}

type ImageObject = {
  name: string
  file: any
  dataUrl: string
}

function ImageUpload(props: ImageUploadProps): ReactElement {
  const [currentImage, setCurrentImage] = useState<any | null>(null)

  // @ts-ignore
  useEffect(() => {
    if (props.image_url) {
      const publicURL = getPublicAvatarUrl(props.image_url)

      if (!publicURL) {
        alert(`no public url was found for: ${props.image_url}`)
      }

      return publicURL
    }
  })

  const handleFilePicker = async (e: any) => {
    if (e.target.files.length > 0) {
      const imageObject: ImageObject = {
        name: e.target.files[0].name,
        file: e.target.files[0],
        dataUrl: URL.createObjectURL(e.target.files[0]),
      }

      if (imageObject && imageObject.name) {
        setCurrentImage({ ...imageObject })

        props.onFileAdded(imageObject)
      }
    }
  }

  const handleDeleteImage = async () => {
    setCurrentImage({})
    props.onFileRemoved()
  }

  return (
    <>
      {!currentImage?.dataUrl && !props.image_url && (
        <label>
          <input
            onChange={handleFilePicker}
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg, image/svg+xml"
          />
        </label>
      )}

      {(currentImage?.dataUrl || props.image_url) && (
        <button onClick={handleDeleteImage}>Delete image</button>
      )}
      {currentImage?.dataUrl && (
        <img
          className="img-fluid img-thumbnail"
          src={currentImage?.dataUrl}
          alt={currentImage?.name}
          loading="lazy"
        />
      )}
      {props.image_url && (
        <img
          className="img-fluid img-thumbnail"
          alt="Avatar"
          src={`/${props.image_url}`}
          loading="lazy"
        />
      )}
    </>
  )
}

export { ImageUpload }
