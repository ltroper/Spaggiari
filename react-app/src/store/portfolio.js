const GET_PORTFOLIO = "portfolio/get"
const ADD_TO_PORTFOLIO = "portfolio/add";


const getPortfolio = portfolio => {
    return {
        type: GET_PORTFOLIO,
        portfolio,
    }
}

const addToPortfolio = portfolio => {
    return {
        type: ADD_TO_PORTFOLIO,
        portfolio,
    }
}

export const getPortfolioThunk = id => async dispatch => {
    const res = await fetch(`/api/portfolio/${id}`)
    const data = await res.json();
    dispatch(getPortfolio(data));
    return data;

}

export const addToPortfolioThunk = portfolio => async dispatch => {
    const res = await fetch(`/api/portfolio/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(portfolio),
    });
    const data = await res.json();
    dispatch(addToPortfolio(data))
};


const initialState = {};

const portfolioReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_PORTFOLIO:
            newState = {};
            newState = action.portfolio.portfolios
            // (action.portfolio.portfolios).forEach(element => {
            //     newState[element.crypto_id] = element.quantity
            // });
            return newState;

        case ADD_TO_PORTFOLIO:
            newState = {};
            newState[action.portfolio.crypto_id] = action.portfolio.quantity
            return newState;



        default:
            return state;
    }
};

export default portfolioReducer
