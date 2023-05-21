import React, { ChangeEvent, ReactElement, useState } from "react"
import {
  createImageObject,
  ImageObject,
} from "../../../services/storage/create-image-object"
import { StaticImage } from "gatsby-plugin-image"

type ImageUploadProps = {
  onFileAdded: (imageObject: ImageObject) => void
  onFileRemoved: () => void
  imagePublicUrl: string | null
  maxWidth?: string
}

function ImageUpload(props: ImageUploadProps): ReactElement {
  const [currentImage, setCurrentImage] = useState<ImageObject | null>(null)

  const handleFilePicker = (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files

    if (files && files.length > 0) {
      const imageObject = createImageObject(files)

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
    <div className={"form-control text-center p-3"}>
      <div>
        {props.imagePublicUrl && (
          <img
            className="rounded"
            alt="Avatar"
            src={props.imagePublicUrl}
            loading="lazy"
            style={{ maxWidth: props.maxWidth }}
          />
        )}
        {!props.imagePublicUrl && (
          <StaticImage
            className="rounded"
            src={`../../assets/images/avatar_placeholder.png`}
            alt="placeholder"
          />
        )}
      </div>
      <div className="mt-2">
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
          <button className="btn btn-primary" onClick={handleDeleteImage}>
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export { ImageUpload }
