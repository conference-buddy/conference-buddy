import { formatDateString } from "./format-date"

describe("formatDateString", () => {
  it("formats the date string correctly", () => {
    const inputDate = "2023-05-28T19:00:36+00:00"
    const expectedFormattedDate = "2023-05-28"
    const formattedDate = formatDateString(inputDate)
    expect(formattedDate).toBe(expectedFormattedDate)
  })

  it("handles single-digit month and day", () => {
    const inputDate = "2023-01-01T00:00:00+00:00"
    const expectedFormattedDate = "2023-01-01"
    const formattedDate = formatDateString(inputDate)
    expect(formattedDate).toBe(expectedFormattedDate)
  })

  it("handles different input timezones", () => {
    const inputDate = "2023-12-31T23:59:59+03:00"
    const expectedFormattedDate = "2023-12-31"
    const formattedDate = formatDateString(inputDate)
    expect(formattedDate).toBe(expectedFormattedDate)
  })

  it("handles leap year", () => {
    const inputDate = "2024-02-29T12:00:00+00:00"
    const expectedFormattedDate = "2024-02-29"
    const formattedDate = formatDateString(inputDate)
    expect(formattedDate).toBe(expectedFormattedDate)
  })

  it("handles invalid input", () => {
    const inputDate = "Invalid Date"
    const formattedDate = formatDateString(inputDate)
    expect(formattedDate).toBe("")
  })

  it("handles input with milliseconds", () => {
    const inputDate = "2023-05-28T19:00:36.123+00:00"
    const expectedFormattedDate = "2023-05-28"
    const formattedDate = formatDateString(inputDate)
    expect(formattedDate).toBe(expectedFormattedDate)
  })

  it("handles input with timezone offset of +00:00", () => {
    const inputDate = "2023-05-28T00:00:00+00:00"
    const expectedFormattedDate = "2023-05-28"
    const formattedDate = formatDateString(inputDate)
    expect(formattedDate).toBe(expectedFormattedDate)
  })

  it("handles input with timezone offset of -05:00", () => {
    const inputDate = "2023-05-28T00:00:00-05:00"
    const expectedFormattedDate = "2023-05-28"
    const formattedDate = formatDateString(inputDate)
    expect(formattedDate).toBe(expectedFormattedDate)
  })

  it("handles input with UTC timezone offset as Z", () => {
    const inputDate = "2023-05-28T00:00:00Z"
    const expectedFormattedDate = "2023-05-28"
    const formattedDate = formatDateString(inputDate)
    expect(formattedDate).toBe(expectedFormattedDate)
  })
})
