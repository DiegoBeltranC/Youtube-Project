import React from "react";

const SearchBar = ( {search, setSearch,handleSearchSubmit} ) =>{
    const onChangeSearch = ({target})=>{
        setSearch(target.value);
    };
    return(
        <div className="search-container">
            <form onSubmit={handleSearchSubmit}>
                <input
                type="text"
                value={search}
                onChange={onChangeSearch} // Actualiza el estado cuando el usuario escribe
                placeholder="Search for videos"
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar;