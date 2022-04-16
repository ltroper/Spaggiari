import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { newWatchlistThunk, getWatchlistThunk } from "../../store/watchlist";

import './portfolio.css'

const Watchlist = () => {

    const history = useHistory()

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user);
    const userWatchlists = useSelector(state => state.watchlist)
    const watchlistArr = Object.values(userWatchlists)

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
                            <input
                                type="text"
                                placeholder="List Name"
                                value={watchlistName}
                                onChange={e => setWatchlistName(e.target.value)}
                            />
                            <button
                                type="submit"
                            >Submit</button>
                        </form>
                        <button onClick={e => setAddList(false)}>Cancel</button>
                    </div>
                }
                <div className="portfolio-crypto-coins-container">
                    {
                        watchlistArr.map(name => (
                            <div className="portfolio-individual-watchlist-container">
                                <div className="portfolio-individual-watchlist-left">
                                    <p>{name}</p>
                                </div>
                                <div className="portfolio-individual-watchlist-right">
                                    <i className="fa-solid fa-arrow-down-to-bracket arrow-sign"></i>
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
