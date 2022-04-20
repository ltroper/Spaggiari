const GET_ALL_DATA = "crypto/data"


const getAllData = data => {
    return {
        type: GET_ALL_DATA,
        data
    }
}

export const getAllDataThunk = (cryptoId, timeFrame) => async dispatch => {
    const today = ((new Date().getTime()) / 1000) - 3600
    const aMonthAgo = (today - timeFrame) - 3600

    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart/range?vs_currency=usd&from=${aMonthAgo}&to=${today}`)
    const cryptoData = await res.json();
    dispatch(getAllData(cryptoData))
    return cryptoData
}


const initialState = {};

const crytpoDataReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {

        case GET_ALL_DATA:
            newState = {};
            newState = action.data
            return newState

        default:
            return state;
    }
};

export default crytpoDataReducer;
