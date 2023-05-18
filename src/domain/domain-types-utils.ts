type Paginated<T> = {
  currentPage: number
  totalPages: number
  totalAmount: number
  entries: T
}

export { Paginated }
