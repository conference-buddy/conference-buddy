import { render, screen, cleanup } from "@testing-library/react"
import { TextArea } from "./TextArea"
import React from "react"

const testLabel = "Label of the textarea"
const testPlaceholder = "Label of the placeholder"

const requiredProps = {
  label: <>{testLabel}</>,
  placeholder: testPlaceholder,
  errorText: "error",
  hasError: false,
  validated: false,
}

describe("TextArea", () => {
  describe("renders all necessary elements", () => {
    beforeAll(() => {
      render(<TextArea {...requiredProps} />)
    })

    afterAll(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it("shows an enabled textArea with a accessible label based on a prop", () => {
      const textArea = screen.getByRole("textbox", { name: testLabel })

      expect(textArea).toBeEnabled()
    })

    it("shows the textArea as not required by default", () => {
      const textArea = screen.getByRole("textbox", { name: testLabel })

      expect(textArea).not.toBeRequired()
    })

    it("shows placeholder based on a prop", () => {
      const textArea = screen.getByRole("textbox", { name: testLabel })

      expect(textArea).toHaveAttribute("placeholder", testPlaceholder)
    })
  })

  describe("handles validation based on props", () => {
    describe("shows no validation info if textArea is not yet validated", () => {
      beforeAll(() => {
        render(<TextArea {...requiredProps} validated={false} />)
      })
      afterAll(() => {
        cleanup()
        jest.clearAllMocks()
      })
      it("does not show info for valid as the textArea is not validated by default", () => {
        const textArea = screen.getByRole("textbox", { name: testLabel })
        const validFeedback = screen.getByText("Looks good!")

        expect(validFeedback).toHaveClass("valid-feedback")
        expect(textArea).not.toHaveClass("is-valid")
      })

      it("does not show info for invalid as the textArea is not validated by default", () => {
        const textArea = screen.getByRole("textbox", { name: testLabel })
        const invalidFeedback = screen.getByText(requiredProps.errorText)

        expect(invalidFeedback).toHaveClass("invalid-feedback")
        expect(textArea).not.toHaveClass("is-invalid")
      })
    })

    describe("shows feedback for a valid textArea when it is validated", () => {
      beforeAll(() => {
        render(<TextArea {...requiredProps} validated={true} />)
      })

      afterAll(() => {
        cleanup()
        jest.clearAllMocks()
      })

      it("does show info for a valid user input", () => {
        const textArea = screen.getByRole("textbox", { name: testLabel })
        const validFeedback = screen.getByText("Looks good!")

        expect(validFeedback).toHaveClass("valid-feedback")
        expect(textArea).toHaveClass("is-valid")
      })

      it("does not show info for invalid user input", () => {
        const input = screen.getByRole("textbox", { name: testLabel })
        const invalidFeedback = screen.getByText(requiredProps.errorText)

        expect(invalidFeedback).toHaveClass("invalid-feedback")
        expect(input).not.toHaveClass("is-invalid")
      })

      it("does mark textArea as valid", () => {
        const input = screen.getByRole("textbox", { name: testLabel })

        expect(input).toBeValid()
      })
    })

    describe("shows feedback and error text when textArea is validated and has error", () => {
      beforeAll(() => {
        render(<TextArea {...requiredProps} validated={true} hasError={true} />)
      })

      afterAll(() => {
        cleanup()
        jest.clearAllMocks()
      })

      it("does not show user input as valid", () => {
        const textArea = screen.getByRole("textbox", { name: testLabel })
        const validFeedback = screen.getByText("Looks good!")

        expect(validFeedback).toHaveClass("valid-feedback")
        expect(textArea).not.toHaveClass("is-valid")
      })

      it("does show error for invalid user input", () => {
        const textArea = screen.getByRole("textbox", { name: testLabel })
        const invalidFeedback = screen.getByText(requiredProps.errorText)

        expect(invalidFeedback).toHaveClass("invalid-feedback")
        expect(textArea).toHaveClass("is-invalid")
      })

      it("does mark textArea as invalid", () => {
        const textArea = screen.getByRole("textbox", { name: testLabel })

        expect(textArea).toBeInvalid()
      })
    })
  })

  describe("renders dependent on props", () => {
    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it("disables textArea based on prop", () => {
      render(<TextArea {...requiredProps} disabled={true} />)
      const textArea = screen.getByRole("textbox", { name: testLabel })

      expect(textArea).toBeDisabled()
    })

    it("shows an textArea as required", () => {
      render(<TextArea {...requiredProps} required={true} />)
      const textArea = screen.getByRole("textbox", { name: testLabel })

      expect(textArea).toBeRequired()
    })
  })
})
