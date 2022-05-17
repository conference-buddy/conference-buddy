import React, { ReactElement, useState } from "react"

type ImageUploadProps = {
  onFileAdded: (imageObject: ImageObject) => void
  onFileRemoved: (imageName: string) => void
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
    if (currentImage?.name) {
      props.onFileRemoved(currentImage.name)
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

      {(currentImage?.dataUrl || props.imagePublicUrl) && (
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
      {props.imagePublicUrl && (
        <img
          className="img-fluid img-thumbnail"
          alt="Avatar"
          src={props.imagePublicUrl}
          loading="lazy"
        />
      )}
    </>
  )
}

export { ImageUpload }
