import './index.css'
import React,{ useState } from "react";

const SearchBar = (props) => {
    const [search, setSearch] = useState("")
    const {HandleOnSearch} = props

    const handleOnChange = (e) => {
        setSearch(e.target.value)
        if(e.target.value.length === 0 ) {
            HandleOnSearch(undefined)
        }
    }

    const HandleOnClickButton = () => {
        HandleOnSearch(search.toLocaleLowerCase())
    }
    return (
        <div className='searchbar-container'>
            <div className='searchbar'>
                <input placeholder='Buscar pokemon...' onChange={handleOnChange} />
            </div>
            <div className='search-button'>
                <button onClick={HandleOnClickButton}>Buscar</button>
            </div>
        </div>
    )
}

export default SearchBar