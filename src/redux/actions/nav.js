export const activeCategory = (category) => ({
    type: "SET_ACTIVE_CATEGORY",
    payload: category,
});
export const cart = () => ({
    type: "UNSET_ACTIVE_CATEGORY",
});
export const toggleCurrencyBlock = (param) => ({
    type: "TOGGLE_CURRENCY_BLOCK",
    payload: param,
});
export const toggleCartBlock = (param) => ({
    type: "TOGGLE_CART_BLOCK",
    payload: param,
});
export const activeCurrency = (currency) => ({
    type: "SET_ACTIVE_CURRENCY",
    payload: currency,
});
