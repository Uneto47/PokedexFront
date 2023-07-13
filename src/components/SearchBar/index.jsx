import './index.css'
import React from "react";

const SearchBar = (props) => {
    const {HandleOnSearch} = props

    const handleOnChange = (e) => {
        if(e.target.value.length === 0 ) {
            HandleOnSearch(undefined)
        } else {
            HandleOnSearch(e.target.value.toLocaleLowerCase())
            
        }
    }
    
    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input placeholder='Buscar pokemon...' onChange={handleOnChange} />
            </div>
        </div>
    )
}

export default SearchBar