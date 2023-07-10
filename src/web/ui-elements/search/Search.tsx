import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { IconSearch } from "@tabler/icons-react"
import { navigate } from "gatsby"

type SearchProps = {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  searchLabel: string
  searchDescription: string
  className?: string
}

function Search({
  searchTerm,
  setSearchTerm,
  searchLabel,
  searchDescription,
  className,
}: SearchProps) {
  const idSearchInput = uuidv4()
  const idSearchDescription = uuidv4()

  const [currentSearch, setCurrentSearch] = useState(searchTerm)

  function onSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const currentSearchTerm = currentSearch.trim()
    setSearchTerm(currentSearchTerm)

    if (currentSearchTerm.length > 0) {
      const query = new URLSearchParams({ search: currentSearchTerm })
      navigate(`?${query.toString()}`)
    } else {
      navigate("/conferences/")
    }
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Escape") return
    setSearchTerm("")
    navigate("/conferences/")
  }

  return (
    <form
      role={"search"}
      onSubmit={onSearchSubmit}
      aria-label={searchLabel}
      className={className}
      aria-describedby={idSearchDescription}
    >
      <div className={"input-group"}>
        <input
          type={"search"}
          value={currentSearch}
          onChange={event => setCurrentSearch(event.target.value)}
          onKeyUp={handleKeyUp}
          id={idSearchInput}
          className={"form-control rounded-start-2"}
        />
        <label className={"visually-hidden"} htmlFor={idSearchInput}>
          Press submit button or enter to start your search. Press escape to
          delete search.
        </label>
        <button
          className={"btn btn-primary btn-sm input-group-text"}
          type={"submit"}
        >
          <span className={"visually-hidden"}>Start search</span>
          <IconSearch data-testid="search-icon" aria-hidden="true" />
        </button>
      </div>
      <div className="form-text text-end" id={idSearchDescription}>
        {searchDescription}
      </div>
    </form>
  )
}

export { Search }
