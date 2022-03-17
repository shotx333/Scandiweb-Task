export const addToCart = (item) => ({
    type: "ADD_TO_CART",
    payload: item,
});

export const minusCart = (item) => ({
    type: "MINUS_ITEM",
    payload: item,
});
export const removeItem = (item) => ({
    type: "REMOVE_ITEM",
    payload: item,
});
export const cleanCart = () => ({
    type: "CLEAN_CART",
});
