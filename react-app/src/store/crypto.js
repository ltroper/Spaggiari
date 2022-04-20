const GET_ALL_CRYPTOS = "crypto/all";


const getAllCryptos = cryptos => {
    return {
        type: GET_ALL_CRYPTOS,
        cryptos,
    };
};



export const getAllCryptosThunk = () => async dispatch => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C30d`);
    const data = await res.json();
    dispatch(getAllCryptos(data));
    return data;
};





const initialState = {};

const crytpoReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_CRYPTOS:
            newState = {};
            action.cryptos.forEach(function (crypto) {
                return (newState[crypto.id] = crypto)
            }
            );
            return newState;

        default:
            return state;
    }
};

export default crytpoReducer;
