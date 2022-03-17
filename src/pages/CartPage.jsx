import React from "react";
import CartItem from "../components/Nav/CartBlock/CartItem";

import {connect} from "react-redux";

import {activeCategory} from "../redux/actions/nav";
import {addToCart, minusCart, removeItem} from "../redux/actions/cart";
import {Link} from "react-router-dom";

import emptyCartImg from "../assets/images/cartEmpty.png";

class CartPage extends React.Component {
    render() {
        const onPlusCart = (item) => {
            this.props.dispatch(addToCart(item));
        };
        const onMinusCart = (item) => {
            this.props.dispatch(minusCart(item));
        };
        const onRemoveItem = (item) => {
            if (window.confirm("Are you sure to remove item?")) {
                this.props.dispatch(removeItem(item));
            }
        };
        return (
            <>
                <div className="container cart">
                    <h1>Cart</h1>
                    {this.props.cart.totalCount > 0 ? (
                        Object.values(this.props.cart.items).map((item, idx) => {
                            return (
                                <CartItem
                                    item={item}
                                    currency={this.props.currency}
                                    key={idx}
                                    onAddItem={onPlusCart}
                                    onMinusItem={onMinusCart}
                                    onRemoveProduct={onRemoveItem}
                                />
                            );
                        })
                    ) : (
                        <div className="cart__empty">
                            <div className="cart__empty-img">
                                <img src={emptyCartImg} alt=""/>
                            </div>
                            <p>Cart is Empty</p>
                            <Link
                                to="/"
                                onClick={() => {
                                    this.props.dispatch(activeCategory("all"));
                                }}
                            >
                                <button>GO BACK HOME</button>
                            </Link>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        currency: state.nav.activeCurrency,
    };
};

export default connect(mapStateToProps)(CartPage);
