const ADD_TO_PORTFOLIO = "portfolio/add";


const addToPortfolio = portfolio => {
    return {
        type: ADD_TO_PORTFOLIO,
        portfolio,
    }
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
        case ADD_TO_PORTFOLIO:
            newState = {};
            return newState;



        default:
            return state;
    }
};

export default portfolioReducer
