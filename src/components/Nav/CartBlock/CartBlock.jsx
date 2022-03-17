import React from "react";

import {connect} from "react-redux";
import {cart, toggleCartBlock} from "../../../redux/actions/nav";
import {addToCart, cleanCart, minusCart, removeItem,} from "../../../redux/actions/cart";
import {Link} from "react-router-dom";

import CartItem from "./CartItem";
import CartIcon from "../../../assets/icons/cartIcon";

import emptyCartImg from "../../../assets/images/cartEmpty.png";

class CartBlock extends React.Component {
    constructor(props) {
        super(props);
        this.cartBlockRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener("click", this.closePopup);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.closePopup);
    }

    render() {
        const togglePopup = () => {
            this.props.dispatch(toggleCartBlock());
        };

        const onPlusCart = (item) => {
            this.props.dispatch(addToCart(item));
        };
        const onMinusCart = (item) => {
            this.props.dispatch(minusCart(item));
        };

        this.closePopup = (e) => {
            this.props.toggleCartBlock &&
            !e.path.includes(this.cartBlockRef.current) &&
            this.props.dispatch(toggleCartBlock(false));
        };

        const onRemoveItem = (item) => {
            if (window.confirm("Are you sure you want to remove this item?")) {
                this.props.dispatch(removeItem(item));
            }
        };

        const onCheckoutPage = () => {
            window.confirm("Confirm your order please!") &&
            this.props.dispatch(cleanCart());

            window.alert("Your order has been sent successfully!");
        };

        this.props.toggleCartBlock
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "auto");

        return (
            <div className="nav__cart" ref={this.cartBlockRef}>
                <div onClick={togglePopup}>
                    {this.props.cart.totalCount > 0 && (
                        <div className="nav__cart-badge">{this.props.cart.totalCount}</div>
                    )}
                    <CartIcon/>
                </div>
                <div
                    className={`nav__cart-block ${
                        this.props.toggleCartBlock ? "active" : ""
                    }`}
                >
                    <h5>
                        My Bag, <span>{this.props.cart.totalCount} items</span>
                    </h5>
                    <div className="cart__items">
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
                                <p>Cart is Empty </p>
                            </div>
                        )}
                    </div>
                    <div className="cart__total">
                        <h3>
                            Total
                            <span>
                {this.props.currency}
                                {(this.props.cart.totalPrice[this.props.currency] &&
                                    this.props.cart.totalPrice[this.props.currency].toFixed(2)) ??
                                0}
              </span>
                        </h3>
                        <div className="cart__buttons">
                            <Link
                                to="/cart"
                                className="btn"
                                onClick={() => {
                                    togglePopup();
                                    this.props.dispatch(cart());
                                }}
                            >
                                View Bag
                            </Link>
                            <button
                                className="btn primary"
                                onClick={onCheckoutPage}
                                disabled={!this.props.cart.totalCount}
                            >
                                Check out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        toggleCartBlock: state.nav.toggleCartBlock,
        currency: state.nav.activeCurrency,
        cart: state.cart,
    };
};

export default connect(mapStateToProps)(CartBlock);
