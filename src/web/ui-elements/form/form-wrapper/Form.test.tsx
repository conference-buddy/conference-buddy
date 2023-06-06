import { cleanup, render, screen, within } from "@testing-library/react"
import {
  DeepPartial,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form"
import React from "react"
import { Form, FormMarkdownEditor, FormTextInput, useForm } from "./Form"
import { z, ZodSchema } from "zod"
import userEvent from "@testing-library/user-event"

type FormWrapperProps<T extends FieldValues> = {
  schema: ZodSchema
  onSubmit: SubmitHandler<T>
  defaultValues?: DeepPartial<T>
  onError?: SubmitErrorHandler<T>
}

const testForm = "Test form"
function FormWrapper<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  onError,
  children,
}: React.PropsWithChildren<FormWrapperProps<T>>) {
  const form = useForm<T>({ schema, defaultValues })
  return (
    <Form onSubmit={onSubmit} onError={onError} {...form} ariaLabel={testForm}>
      {children}
    </Form>
  )
}

const renderForm = <T extends FieldValues>(
  children: React.ReactNode,
  {
    schema,
    defaultValues,
    onSubmit,
    onError,
  }: {
    schema: ZodSchema
    defaultValues?: DeepPartial<T>
    onSubmit: SubmitHandler<T>
    onError?: SubmitErrorHandler<T>
  }
) => {
  return render(
    <FormWrapper<T>
      schema={schema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      onError={onError}
    >
      {children}
    </FormWrapper>
  )
}

// @TODO needs better structured tests
// -> optional & valid, optional and invalid, required & empty, required & other error
describe("Form", () => {
  const user = userEvent.setup()

  describe("handles validation and submitting of form", () => {
    const mockOnSubmit = jest.fn()

    const schema = z.object({
      requiredFormField: z.string().min(3, "validation error message"),
      optionalFormField: z.string().optional(),
    })

    type Schema = z.infer<typeof schema>

    const validationRequiredLabel = "This input is required"
    const optionalLabel = "This input is optional"

    beforeEach(() => {
      renderForm(
        <>
          <FormTextInput<Schema>
            name="requiredFormField"
            label={<>{validationRequiredLabel}</>}
            placeholder={"placeholder"}
            required={true}
          />
          ,
          <FormTextInput<Schema>
            name="optionalFormField"
            label={<>{optionalLabel}</>}
            placeholder={"placeholder"}
          />
          <button type="submit" title="Submit" />
        </>,
        { schema, onSubmit: mockOnSubmit }
      )
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it("submits form when user fills out all required field correctly", async () => {
      const validationInput = screen.getByRole("textbox", {
        name: validationRequiredLabel,
      })

      const submitButton = screen.getByRole("button", { name: "Submit" })

      await user.type(validationInput, "Test")
      await user.click(submitButton)

      expect(mockOnSubmit).toHaveBeenCalledWith(
        { requiredFormField: "Test", optionalFormField: "" },
        expect.anything()
      )
    })

    it("does not submit form when user fills out form incorrectly", async () => {
      const validationInput = screen.getByRole("textbox", {
        name: validationRequiredLabel,
      })

      const submitButton = screen.getByRole("button", { name: "Submit" })

      await user.type(validationInput, "1")
      await user.click(submitButton)

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  describe("handles a form with TextInput", () => {
    const mockOnSubmit = jest.fn()

    const schema = z.object({
      requiredFormField: z.string().min(3, "validation error message"),
      optionalFormField: z.string().optional(),
    })

    type Schema = z.infer<typeof schema>

    const validationRequiredLabel = "This input is required"
    const optionalLabel = "This input is optional"

    beforeEach(() => {
      renderForm(
        <>
          <FormTextInput<Schema>
            name="requiredFormField"
            label={<>{validationRequiredLabel}</>}
            placeholder={"placeholder"}
            required={true}
          />
          ,
          <FormTextInput<Schema>
            name="optionalFormField"
            label={<>{optionalLabel}</>}
            placeholder={"placeholder"}
          />
          <button type="submit" title="Submit" />
        </>,
        { schema, onSubmit: mockOnSubmit }
      )
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it("renders a required TextInput", () => {
      const form = screen.getByRole("form", { name: testForm })
      const textInput = within(form).getByRole("textbox", {
        name: validationRequiredLabel,
      })

      expect(textInput).toBeVisible()
      expect(textInput).toBeRequired()
    })

    it("renders a optional TextInput", () => {
      const form = screen.getByRole("form", { name: testForm })
      const textInput = within(form).getByRole("textbox", {
        name: optionalLabel,
      })

      expect(textInput).toBeVisible()
      expect(textInput).not.toBeRequired()
    })

    it("validates TextInput with validation rules when user leaves field", async () => {
      const validationInput = screen.getByRole("textbox", {
        name: validationRequiredLabel,
      })

      expect(validationInput).not.toBeInvalid()
      expect(validationInput).not.toHaveClass("is-valid")
      expect(validationInput).not.toHaveClass("is-invalid")

      await user.type(validationInput, "Test")
      await user.tab()

      const errorMessage = screen.queryByText("validation error message")

      expect(validationInput).not.toBeInvalid()
      expect(validationInput).toHaveClass("is-valid")
      expect(validationInput).not.toHaveClass("is-invalid")
      expect(errorMessage).not.toBeInTheDocument()
    })

    it("shows validation error for TextInput with validation rules when user leaves field", async () => {
      const validationInput = screen.getByRole("textbox", {
        name: validationRequiredLabel,
      })

      expect(validationInput).not.toBeInvalid()
      expect(validationInput).not.toHaveClass("is-valid")
      expect(validationInput).not.toHaveClass("is-invalid")

      await user.type(validationInput, "T")
      await user.tab()

      const errorMessage = screen.getByText("validation error message")

      expect(validationInput).toBeInvalid()
      expect(validationInput).not.toHaveClass("is-valid")
      expect(validationInput).toHaveClass("is-invalid")
      expect(errorMessage).toBeVisible()
    })

    it("does not show validation feedback for optional TextInput", async () => {
      const optionalInput = screen.getByRole("textbox", {
        name: optionalLabel,
      })

      expect(optionalInput).not.toBeInvalid()
      expect(optionalInput).not.toHaveClass("is-valid")
      expect(optionalInput).not.toHaveClass("is-invalid")

      await user.click(optionalInput)
      await user.tab()

      const errorMessage = screen.queryByText("validation error message")

      expect(optionalInput).not.toBeInvalid()
      expect(optionalInput).not.toHaveClass("is-valid")
      expect(optionalInput).not.toHaveClass("is-invalid")
      expect(errorMessage).not.toBeInTheDocument()
    })

    it("submits form when all required input is valid", async () => {
      const validationInput = screen.getByRole("textbox", {
        name: validationRequiredLabel,
      })
      const submitButton = screen.getByRole("button", { name: "Submit" })
      await user.type(validationInput, "Test")
      await user.click(submitButton)

      expect(mockOnSubmit).toHaveBeenCalledWith(
        { optionalFormField: "", requiredFormField: "Test" },
        expect.anything()
      )
    })

    it("does not submit if required input is not valid", async () => {
      const validationInput = screen.getByRole("textbox", {
        name: validationRequiredLabel,
      })
      const submitButton = screen.getByRole("button", { name: "Submit" })
      await user.type(validationInput, "1")
      await user.click(submitButton)

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  describe("handles a form with FormMarkdownEditor", () => {
    const mockOnSubmit = jest.fn()

    const schema = z.object({
      formField: z.string().min(3, "validation error message"),
    })

    type Schema = z.infer<typeof schema>

    const editorLabel = "markdown editor label"

    beforeEach(() => {
      renderForm(
        <>
          <FormMarkdownEditor<Schema>
            name="formField"
            label={editorLabel}
            placeholder={"placeholder"}
          />
          <button type="submit" title="Submit" />
        </>,
        { schema, onSubmit: mockOnSubmit }
      )
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it("renders a optional FormMarkdownEditor", () => {
      const form = screen.getByRole("form", { name: testForm })
      const editor = within(form).getByRole("textbox", {
        name: editorLabel,
      })

      expect(editor).toBeVisible()
    })

    it("validates FormMarkdownEditor with validation rules when user leaves field", async () => {
      const editor = screen.getByRole("textbox", {
        name: editorLabel,
      })

      expect(editor).not.toBeInvalid()
      // eslint-disable-next-line testing-library/no-node-access
      expect(editor.parentElement).not.toHaveClass("is-valid")
      // eslint-disable-next-line testing-library/no-node-access
      expect(editor.parentElement).not.toHaveClass("is-invalid")

      await user.type(editor, "Test")
      await user.click(document.body)

      const errorMessage = screen.queryByText("validation error message")

      expect(editor).not.toBeInvalid()
      // eslint-disable-next-line testing-library/no-node-access
      expect(editor.parentElement).toHaveClass("is-valid")
      // eslint-disable-next-line testing-library/no-node-access
      expect(editor.parentElement).not.toHaveClass("is-invalid")
      expect(errorMessage).not.toBeInTheDocument()
    })

    it("shows validation error for FormMarkdownEditor with validation rules when user leaves field", async () => {
      const validationInput = screen.getByRole("textbox", {
        name: editorLabel,
      })

      expect(validationInput).not.toBeInvalid()
      expect(validationInput).not.toHaveClass("is-valid")
      expect(validationInput).not.toHaveClass("is-invalid")

      await user.type(validationInput, "T")
      await user.tab()

      const errorMessage = screen.getByText("validation error message")

      expect(validationInput).toBeInvalid()
      // eslint-disable-next-line testing-library/no-node-access
      expect(validationInput.parentElement).not.toHaveClass("is-valid")
      // eslint-disable-next-line testing-library/no-node-access
      expect(validationInput.parentElement).toHaveClass("is-invalid")
      expect(errorMessage).toBeVisible()
    })

    it("does not show validation feedback for optional FormMarkdownEditor", async () => {
      const optionalInput = screen.getByRole("textbox", {
        name: editorLabel,
      })

      expect(optionalInput).not.toBeInvalid()
      // eslint-disable-next-line testing-library/no-node-access
      expect(optionalInput.parentElement).not.toHaveClass("is-valid")
      // eslint-disable-next-line testing-library/no-node-access
      expect(optionalInput.parentElement).not.toHaveClass("is-invalid")

      await user.click(optionalInput)
      await user.tab()

      const errorMessage = screen.queryByText("validation error message")

      expect(optionalInput).not.toBeInvalid()
      // eslint-disable-next-line testing-library/no-node-access
      expect(optionalInput.parentElement).not.toHaveClass("is-valid")
      // eslint-disable-next-line testing-library/no-node-access
      expect(optionalInput.parentElement).not.toHaveClass("is-invalid")
      expect(errorMessage).not.toBeInTheDocument()
    })

    it("submits form when all required input is valid", async () => {
      const validationInput = screen.getByRole("textbox", {
        name: editorLabel,
      })
      const submitButton = screen.getByRole("button", { name: "Submit" })
      await user.type(validationInput, "Test")
      await user.click(submitButton)

      expect(mockOnSubmit).toHaveBeenCalledWith(
        { formField: "Test" },
        expect.anything()
      )
    })

    it("does not submit if required input is not valid", async () => {
      const validationInput = screen.getByRole("textbox", {
        name: editorLabel,
      })
      const submitButton = screen.getByRole("button", { name: "Submit" })
      await user.type(validationInput, "1")
      await user.click(submitButton)

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })
})
