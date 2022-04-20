import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";


const getFilteredSearch = (search, cryptoArray) => {
    if (!search) {
        return
    }
    const matchingArray = cryptoArray.filter(crypto => crypto.name.toUpperCase().includes(search.toUpperCase()))
    return matchingArray
}


const SearchBar = () => {

    const cryptoObj = useSelector(state => state.crypto)
    const cryptoArray = Object.values(cryptoObj)


    const [search, setSearch] = useState('')

    const filteredSearch = getFilteredSearch(search, cryptoArray)

    return (
        <div className='search-nav-bar-container'>
            <input
                className='search-nav-bar'
                type='text'
                placeholder='Search Cryptos'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div>
                {filteredSearch?.map(crypto => (
                    <NavLink
                    style={{ textDecoration: "none", color: "black"}}
                    to={`/crypto/${crypto.id}`}
                    onClick={e => setSearch("")}>
                        <div className='search-nav-bar-crypto' key={crypto.id}>{crypto.name}</div>
                    </NavLink>
                ))}
            </div>
        </div>
    )

}

export default SearchBar
