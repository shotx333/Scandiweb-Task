export const setActiveImg = (src) => ({
    type: "SET_ACTIVE_IMG",
    payload: src,
});
export const setActiveParams = (param) => ({
    type: "SET_ACTIVE_PARAMS",
    payload: param,
});
export const unsetParams = () => ({
    type: "UNSET_PARAMS",
});
