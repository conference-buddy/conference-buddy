import React from "react"
import { TextInput } from "../../text-input/TextInput"
import { MarkdownInput } from "../../markdown-input/MarkdownInput"

function CreateConference() {
  const onSubmit = (event: any) => {
    event.preventDefault()
    console.log("submit", event)
  }

  const onChange = (value: any) => {
    console.log("onChange textinput", value)
  }

  const onMarkdownChange = (value: any) => {
    console.log("onChange markdown", value)
  }

  return (
    <form onSubmit={event => onSubmit(event)}>
      <section className="bg-white rounded p-3 mb-3">
        <div className="row col">
          <TextInput
            onChange={value => onChange(value)}
            label={"🏷️ Conference name"}
            placeholder="Conference name"
            required={true}
          />
        </div>
        <div className="row col">
          <TextInput
            onChange={value => onChange(value)}
            label={"🔗 Confernce website"}
            placeholder="Conference website or other link with more information"
            type="url"
            required={true}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <TextInput
              onChange={value => onChange(value)}
              label={"🗓️ Start date"}
              placeholder="Start date"
              type="date"
              required={true}
            />
          </div>
          <div className="col-md-6">
            <TextInput
              onChange={value => onChange(value)}
              label={"🗓️ End date"}
              placeholder="End date"
              type="date"
              required={true}
            />
          </div>
        </div>
        <MarkdownInput
          value={""}
          onChangeInput={onMarkdownChange}
          label={"📝 More information about the conference"}
          placeholder="Tell others a bit about the conference."
          required={false}
        />
      </section>

      <div className="text-end mb-3">
        <button type="submit" className="btn col-12 btn-confbuddy-green">
          Submit Form
        </button>
      </div>
    </form>
  )
}

export { CreateConference }
