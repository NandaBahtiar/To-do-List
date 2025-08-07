const SET_STATUS_FILTER = 'SET_STATUS_FILTER';
const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
const SET_KEYWORD_FILTER = 'SET_KEYWORD_FILTER';

const initialState = {
    status: 'all',
    category: 'all',
    keyword: '',
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS_FILTER:
            return { ...state, status: action.payload };

        case SET_CATEGORY_FILTER:
            return { ...state, category: action.payload };

        case SET_KEYWORD_FILTER:
            return { ...state, keyword: action.payload };

        default:
            return state;
    }
};

export const setStatusFilter = (status) => ({ type: SET_STATUS_FILTER, payload: status });
export const setCategoryFilter = (category) => ({ type: SET_CATEGORY_FILTER, payload: category });
export const setKeywordFilter = (keyword) => ({ type: SET_KEYWORD_FILTER, payload: keyword });

export default filterReducer;
