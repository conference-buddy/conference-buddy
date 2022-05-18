import React, { ReactElement, useState } from "react"

type ImageUploadProps = {
  onFileAdded: (imageObject: ImageObject) => void
  onFileRemoved: () => void
  imagePublicUrl: string | null
}

type ImageObject = {
  name: string
  file: any
  dataUrl: string
}

function ImageUpload(props: ImageUploadProps): ReactElement {
  const [currentImage, setCurrentImage] = useState<ImageObject | null>(null)

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
    props.onFileRemoved()
    setCurrentImage(null)
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

      {props.imagePublicUrl && (
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
