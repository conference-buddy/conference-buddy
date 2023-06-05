import { render, screen, cleanup } from "@testing-library/react"
import { MarkdownInput } from "./MarkdownInput"
import React from "react"
import userEvent from "@testing-library/user-event"

const testLabel = "Label of the textarea"
const testPlaceholder = "Label of the placeholder"

const mockOnChange = jest.fn()
const requiredProps = {
  onChange: mockOnChange,
  label: testLabel,
  placeholder: testPlaceholder,
  validated: false,
  errorText: "error",
  hasError: false,
}

describe("MarkdownInput", () => {
  const user = userEvent.setup()

  describe("renders all necessary elements", () => {
    beforeAll(() => {
      render(<MarkdownInput {...requiredProps} />)
    })

    afterAll(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it("shows an enabled markdown editor (mock) with a accessible label based on a prop", () => {
      const editor = screen.getByRole("textbox", { name: testLabel })
      const mock = screen.getByTestId("markdown-editor-stub")

      expect(editor).toBeEnabled()
      expect(editor).toEqual(mock)
    })

    it("shows the markdown editor (mock) as not required by default", () => {
      const textArea = screen.getByRole("textbox", { name: testLabel })

      expect(textArea).not.toBeRequired()
    })

    it("shows placeholder based on a prop", () => {
      const textArea = screen.getByRole("textbox", { name: testLabel })

      expect(textArea).toHaveAttribute("placeholder", testPlaceholder)
    })
  })

  describe("handles validation based on props", () => {
    describe("shows no validation info if editor is not yet validated", () => {
      beforeAll(() => {
        render(<MarkdownInput {...requiredProps} validated={false} />)
      })
      afterAll(() => {
        cleanup()
        jest.clearAllMocks()
      })

      it("does not show info for valid as the textArea is not validated by default", () => {
        const editorWrapper = screen.getByRole("textbox", {
          name: testLabel,
          // eslint-disable-next-line testing-library/no-node-access
        }).parentElement
        const validFeedback = screen.getByText("Looks good!")

        expect(validFeedback).toHaveClass("valid-feedback")
        expect(editorWrapper).not.toHaveClass("is-valid")
      })

      it("does not show info for invalid as the editor is not validated by default", () => {
        const editorWrapper = screen.getByRole("textbox", {
          name: testLabel,
          // eslint-disable-next-line testing-library/no-node-access
        }).parentElement
        const invalidFeedback = screen.getByText(requiredProps.errorText)

        expect(invalidFeedback).toHaveClass("invalid-feedback")
        expect(editorWrapper).not.toHaveClass("is-invalid")
      })
    })

    describe("shows feedback for a valid editor when it is validated", () => {
      beforeAll(() => {
        render(<MarkdownInput {...requiredProps} validated={true} />)
      })

      afterAll(() => {
        cleanup()
        jest.clearAllMocks()
      })

      it("does show info for a valid user input", () => {
        const editorWrapper = screen.getByRole("textbox", {
          name: testLabel,
          // eslint-disable-next-line testing-library/no-node-access
        }).parentElement
        const validFeedback = screen.getByText("Looks good!")

        expect(validFeedback).toHaveClass("valid-feedback")
        expect(editorWrapper).toHaveClass("is-valid")
      })

      it("does not show info for invalid user input", () => {
        // eslint-disable-next-line testing-library/no-node-access
        const editorWrapper = screen.getByRole("textbox", {
          name: testLabel,
        }).parentElement
        const invalidFeedback = screen.getByText(requiredProps.errorText)

        expect(invalidFeedback).toHaveClass("invalid-feedback")
        expect(editorWrapper).not.toHaveClass("is-invalid")
      })

      it("does mark editor as valid", () => {
        const editor = screen.getByRole("textbox", { name: testLabel })

        expect(editor).toBeValid()
      })
    })

    describe("shows feedback and error text when textArea is validated and has error", () => {
      beforeAll(() => {
        render(
          <MarkdownInput {...requiredProps} validated={true} hasError={true} />
        )
      })

      afterAll(() => {
        cleanup()
        jest.clearAllMocks()
      })

      it("does not show user input as valid", () => {
        const editor = screen.getByRole("textbox", { name: testLabel })
        const validFeedback = screen.getByText("Looks good!")

        expect(validFeedback).toHaveClass("valid-feedback")
        expect(editor).not.toHaveClass("is-valid")
      })

      it("does show error for invalid user input", () => {
        const editorWrapper = screen.getByRole("textbox", {
          name: testLabel,
        }).parentElement
        const invalidFeedback = screen.getByText(requiredProps.errorText)

        expect(invalidFeedback).toHaveClass("invalid-feedback")
        expect(editorWrapper).toHaveClass("is-invalid")
      })

      it("does mark editor as invalid", () => {
        const editor = screen.getByRole("textbox", { name: testLabel })

        expect(editor).toBeInvalid()
      })
    })
  })

  describe("renders dependent on props", () => {
    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it("disables editor based on prop", () => {
      render(<MarkdownInput {...requiredProps} disabled={true} />)
      const editor = screen.getByRole("textbox", { name: testLabel })

      expect(editor).toBeDisabled()
    })

    it("shows an editor as required", () => {
      render(<MarkdownInput {...requiredProps} required={true} />)
      const editor = screen.getByRole("textbox", { name: testLabel })

      expect(editor).toBeRequired()
    })
  })

  describe("handles required onChange events", () => {
    beforeEach(() => {
      render(<MarkdownInput {...requiredProps} />)
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it("triggers given onChange event for every input", async () => {
      const editor = screen.getByRole("textbox", { name: testLabel })

      await user.type(editor, "Test")

      expect(mockOnChange).toHaveBeenCalledTimes(4)
      expect(editor).toHaveValue("Test")
    })
  })
})
