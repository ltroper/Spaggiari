const ADD_TRANSACTION = "transaction/add";


const addTransaction = transaction => {
    return {
        type: ADD_TRANSACTION,
        transaction,
    }
}

export const addTransactionThunk = transaction => async dispatch => {
    const res = await fetch(`/api/transaction/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
    });
    const data = await res.json();
    dispatch(addTransaction(data))
};

const initialState = {};

const transactionReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_TRANSACTION:
            newState = {};
            return newState;



        default:
            return state;
    }
};

export default transactionReducer
