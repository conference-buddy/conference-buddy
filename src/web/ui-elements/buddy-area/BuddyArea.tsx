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
import * as z from "zod"
import { FieldErrors } from "react-hook-form"
import { Profile } from "../../../domain/profiles"
import {
  Form,
  FormTextArea,
  SubmitButton,
  useForm,
} from "../form/form-wrapper/Form"

type BuddyAreaProps = {
  conferenceId: string
  conferenceName: string | undefined
  profile: Profile
}

const schema = z.object({
  text: z.string().min(20, {
    message:
      "This looks like a short message, please enter at least 20 characters.",
  }),
})

type FormSchema = z.infer<typeof schema>
function BuddyArea({ conferenceId, conferenceName, profile }: BuddyAreaProps) {
  const queryClient = useQueryClient()
  const [showPostError, setShowPostError] = useState(false)

  const {
    data: discussionId,
    isLoading: isLoadingDiscussionId,
    isError: isErrorDiscussionId,
  } = useQuery(["discussions"], () => getDiscussionId(conferenceId))

  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    ["discussion_posts", discussionId],
    () => getDiscussionPosts(discussionId || ""),
    {
      enabled: Boolean(discussionId),
    }
  )

  const form = useForm<FormSchema>({
    schema: schema,
  })

  const { mutate: createPost, isLoading: isLoadingCreatePost } = useMutation(
    (newPost: DiscussionPostCreate) => createDiscussionPost(newPost),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["discussion_posts"])
        form.reset()
      },
      onError() {
        setShowPostError(true)
        form.setError("text", { message: " " })
      },
    }
  )

  if ((!discussionId && isLoadingDiscussionId) || (!posts && isLoadingPosts)) {
    return (
      <div className="container text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!posts || isErrorDiscussionId) {
    return <>Something went wrong :/.</>
  }

  async function onSubmitForm(userInput: FormSchema) {
    if (!userInput || !userInput.text || !profile || !discussionId) return

    const newPost: DiscussionPostCreate = {
      text: userInput.text,
      profile_id: profile.id,
      discussion_id: discussionId,
    }
    await createPost(newPost)
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
              "list-unstyled d-flex flex-column-reverse overflow-auto mb-0"
            }
            style={{ maxHeight: "65vh" }}
          >
            {posts.map((post: DiscussionPost, index: number) => {
              return (
                <li key={`${post.id}-${index}`} className={"px-2 py-3"}>
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
        <Form
          {...form}
          onSubmit={onSubmitForm}
          onError={onError}
          ariaLabel={"Add a post to become a buddy"}
        >
          <div className="d-flex">
            <FormTextArea<FormSchema>
              name={"text"}
              rows={3}
              additionalClasses={"flex-grow-1"}
              required={true}
              label={<>Write a message (min 20 characters</>}
              labelSROnly={true}
              placeholder={"Write something to your fellow Conference Buddies."}
              disabled={isLoadingCreatePost}
            />
            <div
              className={
                "pt-2 pb-2 d-flex justify-content-between flex-column ps-2"
              }
            >
              {isLoadingCreatePost && (
                <button
                  type={"submit"}
                  className={
                    "btn btn-primary btn-sm mb-1 d-flex align-items-center flex-grow-1"
                  }
                  disabled={true}
                >
                  <>
                    <span
                      className={
                        "spinner spinner-border spinner-border-sm me-2"
                      }
                    />{" "}
                    Sending...
                  </>
                </button>
              )}
              {!isLoadingCreatePost && (
                <SubmitButton
                  className={
                    "btn-sm mb-1 d-flex align-items-center flex-grow-1"
                  }
                  text={"Send message"}
                />
              )}

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  form.reset({ text: "" })
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
        </Form>
      </div>
    </div>
  )
}

export { BuddyArea }
