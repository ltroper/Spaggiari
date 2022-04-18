const GET_WATCHLIST = "watchlist/get"
const NEW_WATCHLIST = "watchlist/new"
const DELETE_WATCHLIST = "watchlist/delete"


const getWatchlist = watchlist => {
    return {
        type: GET_WATCHLIST,
        watchlist,
    }
}

const newWatchlist = watchlist => {
    return {
        type: NEW_WATCHLIST,
        watchlist,
    }
}

const deleteWatchlist = id => {
    return {
        type: DELETE_WATCHLIST,
        id
    }
}



export const getWatchlistThunk = id => async dispatch => {
    const res = await fetch(`/api/watchlist/${id}`)
    const data = await res.json()
    dispatch(getWatchlist(data))
    return data
}

export const newWatchlistThunk = watchlist => async dispatch => {
    const res = await fetch(`/api/watchlist/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(watchlist),
    });
    const data = await res.json()
    dispatch(newWatchlist(data))
}

export const deleteWatchlistThunk = id => async dispatch => {
    const res = await fetch(`/api/watchlist/delete/${id}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(deleteWatchlist(id));
        return data;
    }
}


const initialState = {}


const watchlistReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_WATCHLIST:
            action.watchlist.watchlists?.forEach(element => {
                newState[element.id] = element.name
            });
            return newState

        case NEW_WATCHLIST:
            newState[action.watchlist.watchlists.id] = action.watchlist.watchlists.name
            return newState

        case DELETE_WATCHLIST:
            delete newState[action.id];
            return newState;


        default:
            return state;
    }
}

export default watchlistReducer
