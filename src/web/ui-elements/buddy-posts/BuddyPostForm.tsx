import React, { ReactElement, useState } from "react"
import { MarkdownInput } from "../markdown-input/MarkdownInput"
import { createBuddyPost } from "../../../domain/buddy-posts/api/buddy-posts-api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function BuddyPostForm({
  conferenceId,
  profileId,
  cancelEvent,
}: {
  conferenceId: string
  profileId: string
  cancelEvent: () => void
}): ReactElement {
  const queryClient = useQueryClient()
  const [value, setValue] = useState("")

  const { mutate, isSuccess } = useMutation(
    ({
      profileId,
      conferenceId,
      text,
    }: {
      profileId: string
      conferenceId: string
      text: string
    }) =>
      createBuddyPost({
        profileId,
        conferenceId,
        text,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["buddy_posts"])
      },
    }
  )

  if (isSuccess) {
    alert("YEY")
  }

  return (
    <>
      <MarkdownInput
        value={value}
        onChange={text => {
          const value = text ? (text as string) : ""
          setValue(value)
        }}
        onBlur={text => {
          setValue(text)
        }}
        label={"Create your BuddyPost"}
        placeholder="Tell others a bit about yourself."
        required={false}
        validated={false}
        error={""}
      />
      <div className="mt-2 mb-2 d-flex justify-content-end">
        <button
          className="col col-md-2 btn btn-primary me-2"
          onClick={() =>
            mutate({
              profileId,
              conferenceId,
              text: value,
            })
          }
        >
          Send post
        </button>
        <button
          type={"button"}
          className="col col-md-2 btn btn-outline-secondary"
          onClick={cancelEvent}
        >
          Cancel
        </button>
      </div>
    </>
  )
}

export { BuddyPostForm }
