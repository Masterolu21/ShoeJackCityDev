import * as types from './ActionTypes';
// Please reference this link https://reactnavigation.org/docs/en/redux-integration.html
//  define initial state for the redux store
const initialState = {
    id: '',
    email: '',
    username: '',
    billing: '',
    shipping: '' ,
    selling: '',
    payout: '',
};

// define reducers
export default function user(state = initialState, action = {}) {
    switch (action.type) {
        case types.USER_ID:
            return applyValue(state, action, 'id');
        case types.USER_EMAIL:
            return applyValue(state, action, 'email');
        case types.USER_NAME:
            return applyValue(state, action, 'username');
        case types.USER_BILLING:
            return applyValue(state, action, 'billing');
        case types.USER_SHIPPING:
            return applyValue(state, action, 'shipping');
        case types.USER_SELLING:
            return applyValue(state, action, 'selling');
        case types.USER_PAYOUT:
            return applyValue(state, action, 'payout');
        default:
            return state;
    }
}

//change redux's value
function applyValue(state, action, field) {
    return {
        ...state,
        [field]: action.value
    }
}