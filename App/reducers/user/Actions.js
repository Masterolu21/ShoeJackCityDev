import * as types from './ActionTypes';

export function setUserID(id) {
    return {type: types.USER_ID, value: id};
}

export function setUserEmail(id) {
    return {type: types.USER_EMAIL, value: id};
}

export function setUserName(username) {
    return {type: types.USER_NAME, value: username};
}

export function setBilling(value) {
    return {type: types.USER_BILLING, value: value};
}

export function setShipping(value) {
    return {type: types.USER_SHIPPING, value: value};
}

export function setSelling(value) {
    return {type: types.USER_SELLING, value: value};
}

export function setPayout(value) {
    return {type: types.USER_PAYOUT, value: value};
}