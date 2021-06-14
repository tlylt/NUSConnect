const Search = ({ query, setQuery }): JSX.Element => {
  return (
    <div className="shadow-md ml-2 rounded-lg border-2 flex">
      <input
        type="text"
        className="flex w-auto xs:block text-base py-1.5 px-4 rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

export default Search
