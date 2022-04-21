const GET_NEWS = 'news/get'

const getAllNews = news => {
    return {
        type: GET_NEWS,
        news
    }
}

// export const getAllNewsThunk = (topic) => async dispatch => {


//     const res = await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=7d4bd54429444c53bd7f52ac7494728f`)
//     const cryptoNews = await res.json();
//     dispatch(getAllNews(cryptoNews))
//     return cryptoNews
// }

export const getAllNewsThunk = (topic) => async dispatch => {

    const res = await fetch(`https://finnhub.io/api/v1/news?category=general&token=c9gof2qad3iblo2fjir0`)
    const cryptoNews = await res.json();
    dispatch(getAllNews(cryptoNews))
    return cryptoNews
}



const initialState = {};

const crytpoNewsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {

        case GET_NEWS:
            newState = {};
            console.log(action.news)
            newState = action.news
            return newState

        default:
            return state;
    }
};

export default crytpoNewsReducer;
