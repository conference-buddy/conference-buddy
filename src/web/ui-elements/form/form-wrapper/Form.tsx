import {
  Controller,
  FieldPath,
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm as _useForm,
  useFormContext,
  UseFormProps as _UseFormProps,
  UseFormReturn,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodSchema } from "zod"
import { TextInput, TextInputProps } from "../text-input/TextInput"
import {
  MarkdownInput,
  MarkDownInputProps,
} from "../markdown-input/MarkdownInput"
import React, { memo } from "react"
import { Prettify } from "../../../../services/type-utils/type-utils"

type UseFormProps<T extends FieldValues = FieldValues> = Omit<
  _UseFormProps<T>,
  "resolver"
> & {
  schema?: ZodSchema
}

type FormProps<T extends FieldValues = FieldValues> = UseFormReturn<T> & {
  onSubmit: SubmitHandler<T>
  ariaLabel: string
  onError?: SubmitErrorHandler<T>
  className?: string
}

type FormInputProps<T extends FieldValues = FieldValues> = {
  name: FieldPath<T>
}

type FormRegisterProps<T extends FieldValues = FieldValues> = {
  formContext: UseFormReturn<T>
}

function useForm<T extends FieldValues = FieldValues>({
  defaultValues,
  schema,
  ...props
}: UseFormProps<T>): UseFormReturn<T> {
  return _useForm<T>({
    ...props,
    mode: "onTouched",
    defaultValues,
    resolver: schema && zodResolver(schema),
  })
}

function Form<T extends FieldValues = FieldValues>({
  onSubmit,
  onError,
  ariaLabel,
  children,
  ...form
}: React.PropsWithChildren<FormProps<T>>): React.ReactElement<FormProps<T>> {
  return (
    <FormProvider {...form}>
      <form
        noValidate={true}
        className={"has-validation"}
        aria-label={ariaLabel}
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        {children}
      </form>
    </FormProvider>
  )
}

type TextInputAdapted = Prettify<
  Omit<TextInputProps, "errorText" | "hasError" | "validated">
>
function _FormTextInput<T extends FieldValues>({
  name,
  formContext: form,
  isNested,
  ...props
}: TextInputAdapted & { isNested?: boolean } & FormInputProps<T> &
  FormRegisterProps<T>) {
  const { errors, touchedFields } = form.formState

  const error = !isNested
    ? (errors[name]?.message as string)
    : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      (errors[name.split(".")[0]]?.[name.split(".")[1]]?.message as string)

  const fieldTouched = !isNested
    ? touchedFields[name]
    : touchedFields[name.split(".")[0]]?.[name.split(".")[1]]

  const isValidated = props.required
    ? Boolean(fieldTouched)
    : Boolean(form.getValues(name) && fieldTouched)

  return (
    <TextInput
      {...props}
      {...form.register(name)}
      errorText={error}
      hasError={Boolean(error)}
      validated={isValidated}
    />
  )
}

const FormTextInputMemo = memo(_FormTextInput) as typeof _FormTextInput

function FormTextInput<T extends FieldValues>(
  props: FormInputProps<T> & TextInputAdapted & { isNested?: boolean }
): React.ReactElement<FormInputProps<T> & TextInputAdapted> {
  const ctx = useFormContext<T>()
  return <FormTextInputMemo formContext={ctx} {...props} />
}

type FormMarkdownEditoPropsAdpated = Prettify<
  Omit<MarkDownInputProps, "errorText" | "hasError" | "validated" | "onChange">
>
function _FormMarkdownEditor<T extends FieldValues>({
  name,
  formContext: form,
  ...props
}: FormMarkdownEditoPropsAdpated & FormInputProps<T> & FormRegisterProps<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        return (
          <MarkdownInput
            {...props}
            value={field.value as string}
            onChange={text => {
              form.setValue(name, text as any, {
                shouldValidate: true,
                shouldTouch: !!text,
              })
            }}
            onBlur={text => {
              form.setValue(name, text as any, {
                shouldValidate: true,
                shouldTouch: !!text,
              })
            }}
            validated={
              props.required
                ? fieldState.isTouched
                : Boolean(field.value && fieldState.isTouched)
            }
            errorText={fieldState.error?.message || ""}
            hasError={Boolean(fieldState.error)}
          />
        )
      }}
    />
  )
}

const FormMarkdownEditorMemo = memo(
  _FormMarkdownEditor
) as typeof _FormMarkdownEditor
function FormMarkdownEditor<T extends FieldValues>(
  props: FormInputProps<T> & FormMarkdownEditoPropsAdpated
): React.ReactElement<FormInputProps<T> & TextInputAdapted> {
  const ctx = useFormContext<T>()
  return <FormMarkdownEditorMemo formContext={ctx} {...props} />
}

type SubmitButtonProps = {
  text: string
}
function _SubmitButton<T extends FieldValues>({
  ...props
}: SubmitButtonProps & FormRegisterProps<T>) {
  return (
    <button type="submit" className="btn btn-primary btn-lg w-100">
      {props.text}
    </button>
  )
}

const SubmitButtonMemo = memo(
  _SubmitButton,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_prev: FormRegisterProps, _next: FormRegisterProps) => {
    return false
  }
) as typeof _SubmitButton

function SubmitButton<T extends FieldValues>(
  props: SubmitButtonProps
): React.ReactElement<SubmitButtonProps> {
  const ctx = useFormContext<T>()
  return <SubmitButtonMemo formContext={ctx} {...props} />
}

export { useForm, Form, SubmitButton, FormTextInput, FormMarkdownEditor }

// ✨✨  The implementation is based on ✨ ✨
// https://github.com/aiven/klaw/blob/main/coral/src/app/components/Form.tsx
