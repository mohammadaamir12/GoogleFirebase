import { SET_USER_ID } from "./ActionsName";

export const setUserId = (userId) => ({
    type: SET_USER_ID,
    payload: userId
});