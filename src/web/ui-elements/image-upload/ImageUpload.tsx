import React, { ChangeEvent, ReactElement, useState } from "react"

type ImageUploadProps = {
  onFileAdded: (imageObject: ImageObject) => void
  onFileRemoved: () => void
  imagePublicUrl: string | null
}

export type ImageObject = {
  name: string
  file: File
  dataUrl: string
}

function ImageUpload(props: ImageUploadProps): ReactElement {
  const [currentImage, setCurrentImage] = useState<ImageObject | null>(null)

  const handleFilePicker = (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files

    if (files && files.length > 0) {
      const imageObject: ImageObject = {
        name: files[0].name,
        file: files[0],
        dataUrl: URL.createObjectURL(files[0]),
      }

      if (imageObject && imageObject.name) {
        setCurrentImage({ ...imageObject })

        props.onFileAdded(imageObject)
      }
    }
  }

  const handleDeleteImage = async () => {
    if (props.onFileRemoved) {
      props.onFileRemoved()
      setCurrentImage(null)
    }
  }

  return (
    <>
      {!currentImage?.dataUrl && !props.imagePublicUrl && (
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

      {props.imagePublicUrl && props.onFileRemoved && (
        <button onClick={handleDeleteImage}>Delete image here</button>
      )}
      {props.imagePublicUrl && (
        <img
          className="img-fluid img-thumbnail this-is-the-public-url-image"
          alt="Avatar"
          src={props.imagePublicUrl}
          loading="lazy"
        />
      )}
    </>
  )
}

export { ImageUpload }
