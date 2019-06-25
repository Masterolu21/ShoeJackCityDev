import * as types from './ActionTypes';
//define function to change redux' value

// set user id
export function setUserID(id) {
    return {type: types.USER_ID, value: id};
}
//set user email
export function setUserEmail(id) {
    return {type: types.USER_EMAIL, value: id};
}
//set user name
export function setUserName(username) {
    return {type: types.USER_NAME, value: username};
}
//set billing
export function setBilling(value) {
    return {type: types.USER_BILLING, value: value};
}
//setshipping
export function setShipping(value) {
    return {type: types.USER_SHIPPING, value: value};
}
//set selling
export function setSelling(value) {
    return {type: types.USER_SELLING, value: value};
}
//set payout
export function setPayout(value) {
    return {type: types.USER_PAYOUT, value: value};
}