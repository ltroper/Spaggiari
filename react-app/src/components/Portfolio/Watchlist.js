import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getWatchCryptoThunk } from '../../store/watchCrypto'
import { newWatchlistThunk, getWatchlistThunk, deleteWatchlistThunk } from "../../store/watchlist";
import EditWatchlistName from "./editWatchlistName";

import './portfolio.css'

const Watchlist = () => {

    const history = useHistory()

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user);
    const userWatchlists = useSelector(state => state.watchlist)
    const watchlistArr = Object.entries(userWatchlists)

    const watchCrypto = useSelector(state => state?.watchCrypto)
    const watchCryptoArr = Object.values(watchCrypto)

    let cryptoInWatchObj = {}




    watchCryptoArr.forEach(element => {
        if (cryptoInWatchObj[element.watchlist_id]) {
            let arr = cryptoInWatchObj[element.watchlist_id];
            arr.push(element.crypto_id)
            cryptoInWatchObj[element.watchlist_id] = arr;
        } else {
            cryptoInWatchObj[element.watchlist_id] = [element.crypto_id]
        }
    })

    const [dropdownId, setDropdownId] = useState({ "id": -1, "open": false })
    const [selectedWatchList, setSelectedWatchList] = useState([])
    const [addList, setAddList] = useState(false)
    const [watchlistName, setWatchlistName] = useState("")


    async function hanldeSubmit(e) {
        let watchlist = {
            user_id: sessionUser.id,
            name: watchlistName
        }

        await dispatch(newWatchlistThunk(watchlist))
        history.push("/")
    }



    const toggleWatchlist = id => {
        console.log(cryptoInWatchObj[id])
        setSelectedWatchList(cryptoInWatchObj[id])
        setDropdownId({ "id": id, "open": !dropdownId["open"] })

    }



    useEffect(() => {
        dispatch(getWatchlistThunk(sessionUser.id));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getWatchCryptoThunk(sessionUser.id))
    }, [dispatch])

    useEffect(() => {
        if (dropdownId["id"] > 0) {
            const dropdownNode = document.getElementById(`watchlist-${dropdownId["id"]}`)
            dropdownNode?.classList.toggle("hidden")
        }
    }, [dispatch, selectedWatchList])


    const dropDownMenu = (id) => {
        return (
            <div id={`watchlist-${id}`} className="hidden">
                {selectedWatchList.map(name => (
                    <div className="watchlist-list">
                        <NavLink
                        to={`/crypto/${name}`}
                        exact={true}
                        style={{ textDecoration: "none", color: "antiquewhite" }}
                        >
                            <div>{name.toUpperCase()}</div>
                        </NavLink>
                        <button className="edit-delete-buttons">Remove</button>
                    </div>
                ))}
            </div>
        )
    }




    return (
        <div>
            <div className="portfolio-crypto-header-container list-header">
                <h4 className="portfolio-crypto-header">Lists</h4>
                <i className="fa-regular fa-plus fa-2xl plus-sign" onClick={e => setAddList(!addList)}></i>
            </div>
            <div>
                {addList &&
                    <div>
                        <form onSubmit={hanldeSubmit}>
                            <div className="add-new-list-container">
                                <input
                                    className="add-new-list-input"
                                    type="text"
                                    placeholder="List Name"
                                    value={watchlistName}
                                    onChange={e => setWatchlistName(e.target.value)}
                                />
                            </div>
                            <div className="add-new-list-container">
                                <button
                                    className="add-new-list-submit"
                                    type="submit"
                                >Submit
                                </button>
                                <button
                                    onClick={e => setAddList(false)}
                                >Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                }
                <div className="portfolio-crypto-coins-container">
                    {
                        watchlistArr.map(([id, name]) => (
                            <div className="portfolio-individual-watchlist-container">
                                <div className="portfolio-individual-watchlist-left">
                                    <p>{name}</p>
                                </div>
                                <div className="portfolio-individual-watchlist-right">
                                    <div className="edit-delete-buttons-cont">
                                        <EditWatchlistName name={name} id={id}/>
                                        <button onClick={e => dispatch(deleteWatchlistThunk(id))} className="edit-delete-buttons">Delete</button>
                                    </div>
                                    <span key={id} onClick={() => toggleWatchlist(id)} className="arrow-down"></span>
                                </div>
                                <div>
                                    {dropDownMenu(id)}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Watchlist
