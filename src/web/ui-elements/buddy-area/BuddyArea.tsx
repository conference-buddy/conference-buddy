import React, { useState } from "react"
import { BuddyAreaPost } from "./BuddyAreaPost"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createDiscussionPost,
  getDiscussionId,
  getDiscussionPosts,
} from "../../../domain/discussion/api/discussion-api"
import {
  DiscussionPost,
  DiscussionPostCreate,
} from "../../../domain/discussion/types/discussion-types"
import useProfile from "../../../services/hooks/profile/useProfile"
import { navigate } from "gatsby"
import { TextArea } from "../textarea/TextArea"
import * as z from "zod"
import { FieldErrors, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

type BuddyAreaProps = {
  conferenceId: string
}

const schema = z.object({
  text: z.string().min(20, {
    message:
      "This looks like a short message, please enter at least 20 characters.",
  }),
})

type FormSchema = z.infer<typeof schema>
function BuddyArea({ conferenceId }: BuddyAreaProps) {
  const queryClient = useQueryClient()
  const [showPostError, setShowPostError] = useState(false)
  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
  } = useProfile()

  const { data: discussionId, isError: isErrorDiscussionId } = useQuery(
    ["discussions"],
    () => getDiscussionId(conferenceId)
  )

  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    ["discussion_posts", discussionId],
    () => getDiscussionPosts(discussionId || ""),
    {
      enabled: Boolean(discussionId),
    }
  )

  const { mutate: createPost, isLoading: isLoadingCreatePost } = useMutation(
    (newPost: DiscussionPostCreate) => createDiscussionPost(newPost),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["discussion_posts"])
        reset()
      },
      onError() {
        setShowPostError(true)
        setError("text", { message: " " })
      },
    }
  )

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, touchedFields },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  })

  if (!profile && !isLoadingProfile) {
    navigate(`/conference/${conferenceId}`)
    return <></>
  }

  if (!posts || isErrorProfile || isErrorDiscussionId) {
    return <>Something went wrong :/.</>
  }

  const onSubmit = (data: FormSchema) => {
    if (!data || !data.text || !profile || !discussionId) return

    const newPost: DiscussionPostCreate = {
      text: data.text,
      profile_id: profile.id,
      discussion_id: discussionId,
    }
    createPost(newPost)
  }

  const onError = (errors: FieldErrors<FormSchema>) => {
    //@todo add better error handling
    console.log(errors)
  }

  return (
    <div className={"border border-1 mt-5 "}>
      <div
        className={
          "bg-primary bg-opacity-10 rounded border border-5 border-white"
        }
      >
        {isLoadingPosts && <div className={"spinner"}></div>}
        {posts.length === 0 && (
          <div className={"p-5 text-center"}>Be the first one to post ✨</div>
        )}
        {posts.length > 0 && profile && (
          <ul
            className={
              "list-unstyled d-flex flex-column-reverse overflow-auto mb-0 border-bottom border-white border-5"
            }
            style={{ maxHeight: "50vh" }}
          >
            {posts.map((post: DiscussionPost, index: number) => {
              return (
                <li key={`${post.id}-${index}`} className={"p-4"}>
                  <BuddyAreaPost
                    post={post}
                    currentProfile={profile}
                    index={index}
                  />
                </li>
              )
            })}
          </ul>
        )}
        <form
          className={"mx-md-5 p-3 has-validation"}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <TextArea<FormSchema>
            register={register}
            name={"text"}
            required={true}
            label={"Write a message (min 20 characters)"}
            placeholder={"Write something to your fellow Conference Buddies."}
            validated={Boolean(touchedFields.text)}
            error={errors?.text?.message as string}
            disabled={isLoadingCreatePost}
          />
          <div className={"mt-2 me-2 d-flex justify-content-end"}>
            <button
              type={"submit"}
              className={
                "btn btn-primary btn-sm me-2 d-flex align-items-center"
              }
              disabled={isLoadingCreatePost}
            >
              {isLoadingCreatePost ? (
                <>
                  <span
                    className={"spinner spinner-border spinner-border-sm me-2"}
                  />{" "}
                  Sending...
                </>
              ) : (
                <span>Send message</span>
              )}
            </button>
            <button
              type={"button"}
              className={"btn btn-outline-danger btn-sm"}
              onClick={() => {
                reset({ text: "" })
                setShowPostError(false)
              }}
              disabled={isLoadingCreatePost}
            >
              Cancel
            </button>
          </div>
          {showPostError && (
            <div className="alert alert-danger mt-3" role="alert">
              An error happened while trying to send your message. 😔
              <br />
              Please try to reset by canceling your input and try to send a new
              message.
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export { BuddyArea }
