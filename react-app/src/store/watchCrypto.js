const GET_WATCHCRYPTO = "watchcrypto/get"
const ADD_WATCHCRYPTO = "watchlist/crypto"
const DELETE_WATCHCRYPTO = "watchcrypto/delete"


const getWatchCrypto = watchlistCrypto => {
    return {
        type: GET_WATCHCRYPTO,
        watchlistCrypto,
    }
}

const addWatchCrypto = watchlistCrypto => {
    return {
        type: ADD_WATCHCRYPTO,
        watchlistCrypto,
    }
}

const deleteWatchCrypto = id => {
    return {
        type: DELETE_WATCHCRYPTO,
        id
    }
}

export const getWatchCryptoThunk = id => async dispatch => {
    const res = await fetch(`/api/watchlist/crypto/${id}`)
    const data = await res.json()
    dispatch(getWatchCrypto(data))
    return data
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

export const deleteWatchCryptoThunk = id => async dispatch => {
    const res = await fetch(`/api/watchlist/crypto/delete/${id}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(deleteWatchCrypto(id));
        return data;
    }
}

const initialState = {}

const watchCryptoReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_WATCHCRYPTO:
                action.watchlistCrypto.watchCrypto.forEach(element => {
                    newState[element.id] = element
                });
            return newState

        case ADD_WATCHCRYPTO:
            newState[action.watchlistCrypto.id] = action.watchlistCrypto
            return newState

        case DELETE_WATCHCRYPTO:
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
}

export default watchCryptoReducer
