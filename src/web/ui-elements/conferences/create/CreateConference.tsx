import React from "react"
import { TextInput } from "../../text-input/TextInput"
import { TextAreaInput } from "../../textarea-input/TextAreaInput"

function CreateConference() {
  const onSubmit = (event: any) => {
    event.preventDefault()
    console.log("submit", event)
  }

  const onChange = (value: any) => {
    console.log("onChange textinput", value)
  }

  const onChangeTextarea = (value: any) => {
    console.log("onChange textarea", value)
  }

  return (
    <form onSubmit={event => onSubmit(event)}>
      <section className="bg-white rounded p-3 mb-3">
        <div className="row col">
          <TextInput
            onChange={value => onChange(value)}
            label={"🏷️ Conference name (required)"}
            placeholder="The Awesome Conference"
            required={true}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <TextInput
              onChange={value => onChange(value)}
              label={"📍 Country (required)"}
              placeholder="Awesomeland"
              required={true}
              list={["Germany", "Netherlands"]}
            />
          </div>
          <div className="col-md-6">
            <TextInput
              onChange={value => onChange(value)}
              label={"📍 City (required)"}
              placeholder="Awesomecity "
              required={true}
              list={["Frankfurt", "Amsterdam"]}
            />
          </div>
        </div>
        <div className="row col">
          <TextInput
            onChange={value => onChange(value)}
            label={
              "🔗 Confernce website or link with more information (required)"
            }
            placeholder="http://awesome-conference-website.org"
            type="url"
            required={true}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <TextInput
              onChange={value => onChange(value)}
              label={"🗓️ Start date (required)"}
              placeholder="Start date"
              type="date"
              required={true}
            />
          </div>
          <div className="col-md-6">
            <TextInput
              onChange={value => onChange(value)}
              label={"🗓️ End date (required)"}
              placeholder="End date"
              type="date"
              required={true}
            />
          </div>
        </div>
        <TextAreaInput
          onChange={onChangeTextarea}
          label={"📝 More information about the conference"}
          placeholder="Tell others a bit about the awesome conference."
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
