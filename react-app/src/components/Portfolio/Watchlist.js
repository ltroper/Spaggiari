import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getWatchCryptoThunk, deleteWatchCryptoThunk } from '../../store/watchCrypto'
import { newWatchlistThunk, getWatchlistThunk, deleteWatchlistThunk } from "../../store/watchlist";
import EditWatchlistName from "./editWatchlistName";

import './portfolio.css'

const Watchlist = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const userWatchlists = useSelector(state => state.watchlist);
    const watchCrypto = useSelector(state => state.watchCrypto);

    const allCryptos = useSelector(state => state.crypto)


    // The following is simply not state managed, we cannot watch lifecycle of this stuff.
    // const watchlistArr = Object.entries(userWatchlists)
    // const watchCryptoArr = Object.values(watchCrypto)
    // let cryptoInWatchObj = {};
    // watchCryptoArr.forEach(element => {
    //     if (cryptoInWatchObj[element.watchlist_id]) {
    //         let arr = cryptoInWatchObj[element.watchlist_id];
    //         arr.push(element.crypto_id)
    //         cryptoInWatchObj[element.watchlist_id] = arr;
    //     } else {
    //         cryptoInWatchObj[element.watchlist_id] = [element.crypto_id]
    //     }
    // });

    const [watchlistName, setWatchlistName] = useState(""); // set by onChange;
    const [addList, setAddList] = useState(false); // set by onClick;
    const [cryptoLists, setCryptoLists] = useState([]);

    useEffect(() => {
        dispatch(getWatchlistThunk(sessionUser.id));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getWatchCryptoThunk(sessionUser.id));
    }, [dispatch]);

    useEffect(() => {
        setCryptoLists(Object.values(watchCrypto));
    }, [dispatch, watchCrypto]);

    function handleSubmit(e) {
        let watchlist = {
            user_id: sessionUser.id,
            name: watchlistName
        };
        // async/await no necessary as we are not waiting response from API.
        // await dispatch(newWatchlistThunk(watchlist))
        dispatch(newWatchlistThunk(watchlist));
        history.push("/");
    }

    const toggleWatchlist = (id) => {
        let dropdownNode = document.getElementById(`watchlist-${id}`);
        dropdownNode.classList.toggle("hidden");
    };

    console.log(cryptoLists)


    return (
        <div>
            <div className="portfolio-crypto-header-container list-header">
                <h4 className="portfolio-crypto-header">Lists</h4>
                <i className="fa-regular fa-plus fa-2xl plus-sign" onClick={e => setAddList(!addList)}></i>
            </div>
            <div>
                {addList &&
                    <div>
                        <form onSubmit={handleSubmit}>
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
                    {Object.entries(userWatchlists)?.map(([id, name]) => (
                        <div className="portfolio-individual-watchlist-container">
                            <div className="portfolio-individual-watchlist-left">
                                <p>{name}</p>
                            </div>
                            <div className="portfolio-individual-watchlist-right">
                                <div className="edit-delete-buttons-cont">
                                    <EditWatchlistName name={name} id={id} />
                                    <button onClick={e => dispatch(deleteWatchlistThunk(id))} className="edit-delete-buttons">Delete</button>
                                </div>
                                <span key={id} onClick={() => toggleWatchlist(id)} className="arrow-down"></span>
                            </div>
                            <div id={`watchlist-${id}`} className={"hidden"}>
                                {
                                    cryptoLists?.filter((c) => c['watchlist_id'] === +id).map(filteredCrypt => (
                                        <div className="watchlist-list">
                                            <div className="crypto-name-image">
                                                <NavLink to={`/crypto/${filteredCrypt.crypto_id}`}
                                                    exact={true}
                                                    style={{ textDecoration: "none", color: "antiquewhite" }}
                                                >
                                                    <div>{filteredCrypt.crypto_id.toUpperCase()}</div>
                                                </NavLink>
                                                    <img className="small-crypto-image" src={allCryptos[filteredCrypt.crypto_id]?.image}></img>
                                            </div>
                                            <div className="remove-button-container">
                                                <button onClick={e => dispatch(deleteWatchCryptoThunk(filteredCrypt.id))} className="edit-delete-buttons">Remove</button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Watchlist
