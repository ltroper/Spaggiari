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

    const sessionUser = useSelector(state => state.session.user);

    const cryptoObj = useSelector(state => state.crypto)
    const cryptoArray = Object.values(cryptoObj)


    const [search, setSearch] = useState('')

    const filteredSearch = getFilteredSearch(search, cryptoArray)

    return (
        <div>
            <input
                type='text'
                placeholder='Search Cryptos'
                onChange={e => setSearch(e.target.value)}
            />
            <div>
                {filteredSearch?.map(crypto => (
                    <NavLink to={`/crypto/${crypto.id}`}>
                        <div key={crypto.id}>{crypto.name}</div>
                    </NavLink>
                ))}
            </div>
        </div>
    )

}

export default SearchBar
