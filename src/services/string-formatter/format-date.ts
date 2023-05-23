export function formatDateString(
  inputDate: string,
  withTime?: boolean
): string {
  const dateObject: Date = new Date(inputDate)

  if (isNaN(dateObject.getTime())) {
    // Invalid input date
    return ""
  }

  const year: number = dateObject.getFullYear()
  const month: string = ("0" + (dateObject.getMonth() + 1)).slice(-2) // Adding 1 because month indexes start from 0
  const day: string = ("0" + dateObject.getDate()).slice(-2)
  const timeLocal: string = dateObject.toLocaleTimeString()

  const time = withTime ? `, ${timeLocal}` : ``
  return `${year}-${month}-${day}${time}`
}
