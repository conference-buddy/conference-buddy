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
  conferenceName: string | undefined
}

const schema = z.object({
  text: z.string().min(20, {
    message:
      "This looks like a short message, please enter at least 20 characters.",
  }),
})

type FormSchema = z.infer<typeof schema>
function BuddyArea({ conferenceId, conferenceName }: BuddyAreaProps) {
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
    <div className={"border border-1 mt-3 rounded-3"}>
      <div className="text-center bg-white">
        <h1 className="h2 m-0 py-2 rounded-3">
          <i>Buddy area:</i> {conferenceName}
        </h1>
      </div>

      <div
        className={
          "bg-primary bg-opacity-10 rounded border border-5 border-white border-top-0"
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
            style={{ maxHeight: "65vh" }}
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
          className={"mx-md-4 p-2 has-validation"}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="d-flex">
            <TextArea<FormSchema>
              register={register}
              name={"text"}
              rows={3}
              required={true}
              labelSROnly={true}
              additionalClasses="flex-grow-1"
              label={"Write a message (min 20 characters)"}
              placeholder={"Write something to your fellow Conference Buddies."}
              validated={Boolean(touchedFields.text)}
              error={errors?.text?.message as string}
              disabled={isLoadingCreatePost}
            />
            <div
              className={
                "pt-2 pb-2 d-flex justify-content-between flex-column ps-2"
              }
            >
              <button
                type={"submit"}
                className={
                  "btn btn-primary btn-sm mb-1 d-flex align-items-center flex-grow-1"
                }
                disabled={isLoadingCreatePost}
              >
                {isLoadingCreatePost ? (
                  <>
                    <span
                      className={
                        "spinner spinner-border spinner-border-sm me-2"
                      }
                    />{" "}
                    Sending...
                  </>
                ) : (
                  <span>Send message</span>
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  reset({ text: "" })
                  setShowPostError(false)
                }}
                disabled={isLoadingCreatePost}
              >
                Cancel
              </button>
            </div>
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
