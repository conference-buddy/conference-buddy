import { render, screen, cleanup } from "@testing-library/react"
import { TextInput } from "./TextInput"
import React from "react"

const testLabel = "Label of the input"
const testPlaceholder = "Label of the placeholder"

const requiredProps = {
  label: <>{testLabel}</>,
  placeholder: testPlaceholder,
  errorText: "error",
  hasError: false,
  validated: false,
  name: "testname",
}

describe("TextInput", () => {
  describe("renders all necessary elements", () => {
    beforeAll(() => {
      render(<TextInput {...requiredProps} />)
    })

    afterAll(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it("shows an enabled input with a accessible label based on a prop", () => {
      const input = screen.getByRole("textbox", { name: testLabel })

      expect(input).toBeEnabled()
    })

    it("shows the input as not required by default", () => {
      const input = screen.getByRole("textbox", { name: testLabel })

      expect(input).not.toBeRequired()
    })

    it("shows the input as type text by default", () => {
      const input = screen.getByRole("textbox", { name: testLabel })

      expect(input).toHaveAttribute("type", "text")
    })

    it("shows placeholder based on a prop", () => {
      const input = screen.getByRole("textbox", { name: testLabel })

      expect(input).toHaveAttribute("placeholder", testPlaceholder)
    })
  })

  describe("handles validation based on props", () => {
    describe("shows no validation info if input is not yet validated", () => {
      beforeAll(() => {
        render(<TextInput {...requiredProps} validated={false} />)
      })
      afterAll(() => {
        cleanup()
        jest.clearAllMocks()
      })

      it("does not show info for valid user input", () => {
        const input = screen.getByRole("textbox", { name: testLabel })
        const validFeedback = screen.getByText("Looks good!")

        expect(validFeedback).toHaveClass("valid-feedback")
        expect(input).not.toHaveClass("is-valid")
      })

      it("does not show info for invalid user input", () => {
        const input = screen.getByRole("textbox", { name: testLabel })
        const invalidFeedback = screen.getByText(requiredProps.errorText)

        expect(invalidFeedback).toHaveClass("invalid-feedback")
        expect(input).not.toHaveClass("is-invalid")
      })
    })

    describe("shows feedback for a valid input when it is validated", () => {
      beforeAll(() => {
        render(<TextInput {...requiredProps} validated={true} />)
      })

      afterAll(() => {
        cleanup()
        jest.clearAllMocks()
      })

      it("does show info for valid user input", () => {
        const input = screen.getByRole("textbox", { name: testLabel })
        const validFeedback = screen.getByText("Looks good!")

        expect(validFeedback).toHaveClass("valid-feedback")
        expect(input).toHaveClass("is-valid")
      })

      it("does not show info for invalid user input", () => {
        const input = screen.getByRole("textbox", { name: testLabel })
        const invalidFeedback = screen.getByText(requiredProps.errorText)

        expect(invalidFeedback).toHaveClass("invalid-feedback")
        expect(input).not.toHaveClass("is-invalid")
      })

      it("does mark input as valid", () => {
        const input = screen.getByRole("textbox", { name: testLabel })

        expect(input).toBeValid()
      })
    })

    describe("shows feedback and error text when input is validated and has error", () => {
      beforeAll(() => {
        render(
          <TextInput {...requiredProps} validated={true} hasError={true} />
        )
      })

      afterAll(() => {
        cleanup()
        jest.clearAllMocks()
      })

      it("does not show user input as valid", () => {
        const input = screen.getByRole("textbox", { name: testLabel })
        const validFeedback = screen.getByText("Looks good!")

        expect(validFeedback).toHaveClass("valid-feedback")
        expect(input).not.toHaveClass("is-valid")
      })

      it("does show error for invalid user input", () => {
        const input = screen.getByRole("textbox", { name: testLabel })
        const invalidFeedback = screen.getByText(requiredProps.errorText)

        expect(invalidFeedback).toHaveClass("invalid-feedback")
        expect(input).toHaveClass("is-invalid")
      })

      it("does mark input as invalid", () => {
        const input = screen.getByRole("textbox", { name: testLabel })

        expect(input).toBeInvalid()
      })
    })
  })

  describe("renders dependent on props", () => {
    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it("disables input based on prop", () => {
      render(<TextInput {...requiredProps} disabled={true} />)
      const input = screen.getByRole("textbox", { name: testLabel })

      expect(input).toBeDisabled()
    })

    it("shows an input as required", () => {
      render(<TextInput {...requiredProps} required={true} />)
      const input = screen.getByRole("textbox", { name: testLabel })

      expect(input).toBeEnabled()
      expect(input).toBeRequired()
    })

    it("shows a description for assistive technology", () => {
      const description = "This is a description"
      render(<TextInput {...requiredProps} ariaDescription={description} />)
      const input = screen.getByRole("textbox", { name: testLabel })

      expect(input).toHaveAccessibleDescription(description)
    })

    describe("changes the type of input based on prop", () => {
      it("shows a input for an url", () => {
        render(<TextInput {...requiredProps} type={"url"} />)
        const input = screen.getByRole("textbox", { name: testLabel })

        expect(input).toHaveAttribute("type", "url")
      })

      it("shows a input for a date", () => {
        render(<TextInput {...requiredProps} type="date" />)
        // type="date" does not translate to an accessible element
        // in testing library
        const input = screen.getByLabelText(testLabel)

        expect(input).toHaveAttribute("type", "date")
      })

      it("shows a input for an email", () => {
        render(<TextInput {...requiredProps} type="email" />)
        // type="date" does not translate to an accessible element
        // in testing library
        const input = screen.getByLabelText(testLabel)

        expect(input).toHaveAttribute("type", "email")
      })
    })

    describe("takes a list of data as datalist", () => {
      const testDataList = [
        "first suggestion",
        "second suggestion",
        "third suggestion",
      ]

      it("shows a input with a datalist", () => {
        render(<TextInput {...requiredProps} list={testDataList} />)

        const input = screen.getByRole("combobox", { name: testLabel })

        expect(input).toBeEnabled()
      })

      testDataList.forEach(entry => {
        it(`shows the entry ${entry} as an option`, () => {
          render(<TextInput {...requiredProps} list={testDataList} />)

          const input = screen.getByRole("combobox", { name: testLabel })
          const option = screen.getByRole("option", {
            name: entry,
            hidden: true,
          })

          expect(input).toBeEnabled()
          expect(option).toBeInTheDocument()
        })
      })
    })
  })
})
