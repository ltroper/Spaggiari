const UPDATE_USER = "user/update"

const updateUser = user => {
    return {
        type: UPDATE_USER,
        user,
    };
};

export const updateUserThunk = user => async dispatch => {
    const res = await fetch('/api/users/edit', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    const data = await res.json();
    dispatch(updateUser(data));
};


const initialState = {};

const userReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case UPDATE_USER:
            newState[action.user.id] = action.user;

            return newState;


        default:
            return state;
    }
};

export default userReducer;
