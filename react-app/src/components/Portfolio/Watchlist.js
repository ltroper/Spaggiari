import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { newWatchlistThunk, getWatchlistThunk, deleteWatchlistThunk } from "../../store/watchlist";

import './portfolio.css'

const Watchlist = () => {

    const history = useHistory()

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user);
    const userWatchlists = useSelector(state => state.watchlist)
    const watchlistArr = Object.entries(userWatchlists)

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

    useEffect(() => {
        dispatch(getWatchlistThunk(sessionUser.id));
    }, [dispatch]);


    console.log(userWatchlists)

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
                                        <button className="edit-delete-buttons">Edit</button>
                                        <button onClick={e=>dispatch(deleteWatchlistThunk(id))} className="edit-delete-buttons">Delete</button>
                                    </div>
                                    <span className="arrow-down"></span>
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
