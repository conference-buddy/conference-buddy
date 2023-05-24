import React, { ReactElement } from "react"
import { ImageUpload } from "./ImageUpload"
import useUpdateAvatar from "../../../services/hooks/profile/useUpdateAvatar"
import { getPublicAvatarUrl } from "../../../services/storage/avatar"
import { ImageObject } from "../../../services/storage/create-image-object"
import useDeleteAvatar from "../../../services/hooks/profile/useDeleteAvatar"
import { IconCircleCheck } from "@tabler/icons-react"

type UpdateAvatarProps = {
  profileId: string
  avatarUrl: string | null
  maxWidth?: string
}

function UpdateAvatar(props: UpdateAvatarProps): ReactElement {
  const { mutate: updateAvatar, isSuccess: isSuccessUpload } = useUpdateAvatar(
    props.profileId
  )
  const { mutate: deleteAvatar, isSuccess: isSuccessDelete } = useDeleteAvatar(
    props.profileId
  )

  async function uploadImage(imageObject: ImageObject) {
    updateAvatar({ avatarFile: imageObject })
  }

  async function deleteImage() {
    if (props.avatarUrl) {
      deleteAvatar({ avatarUrl: props.avatarUrl })
    }
  }

  return (
    <>
      <div className={"text-success p-2 text-center"}>
        {(isSuccessUpload || isSuccessDelete) && (
          <>
            <IconCircleCheck aria-hidden={true} /> That worked!
          </>
        )}
      </div>

      <ImageUpload
        onFileAdded={uploadImage}
        onFileRemoved={deleteImage}
        imagePublicUrl={props.avatarUrl && getPublicAvatarUrl(props.avatarUrl)}
        maxWidth={props.maxWidth}
      />
    </>
  )
}

export { UpdateAvatar }
