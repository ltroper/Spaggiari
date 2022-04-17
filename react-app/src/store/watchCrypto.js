const ADD_WATCHCRYPTO = "watchlist/crypto"


const addWatchCrypto = watchlistCrypto => {
    return {
        type: ADD_WATCHCRYPTO,
        watchlistCrypto,
    }
}


export const addWatchCryptoThunk = watchlist => async dispatch => {
    const res = await fetch(`/api/watchlist/crypto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(watchlist),
    });
    const data = await res.json()
    dispatch(addWatchCrypto(data))
}

const initialState = {}

const watchCryptoReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_WATCHCRYPTO:
            newState[action.watchlistCrypto.id] = action.watchlistCrypto
            return newState

        default:
            return state;
    }
}

export default watchCryptoReducer
