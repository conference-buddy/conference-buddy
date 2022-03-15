import React, { ReactElement, useState } from "react"
import { supabase } from "../../../domain/_database/supabaseClient"

function ImageUpload(): ReactElement {
  const [file, setFile] = useState<File | null>(null)

  async function testOnSubmit() {
    if (file) {
      await supabase.storage
        .from("avatars")
        .upload(`public/${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
        })
    }
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        testOnSubmit()
      }}
    >
      <label htmlFor="avatar">Choose a profile picture:</label>
      <input
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        onChange={event => setFile(event.target.files[0])}
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg, image/svg+xml"
      />
      <div className="text-end mb-3">
        <button type="submit" className="btn col-12 btn-confbuddy-green">
          Submit Form
        </button>
      </div>
    </form>
  )
}

export { ImageUpload }
