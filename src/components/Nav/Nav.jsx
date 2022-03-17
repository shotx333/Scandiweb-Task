import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import checkoutIco from "../../assets/icons/checkoutIco.png";
import CartBlock from "./CartBlock/CartBlock";
import Categories from "./Categories";
import CurrencyBlock from "./CurrencyBlock";

import {cart} from "../../redux/actions/nav";

class Nav extends React.Component {
    render() {
        const clickCart = () => {
            this.props.dispatch(cart());
        };
        return (
            <>
                <nav
                    className={`nav ${this.props.toggleCartBlock ? "cart-opened" : ""}`}
                >
                    <div className="nav__container container">
                        <Categories/>
                        <div className="nav__checkout">
                            <Link to="/cart">
                                <img src={checkoutIco} alt="" onClick={clickCart}/>
                            </Link>
                        </div>
                        <div className="nav__control">
                            <CurrencyBlock/>
                            <CartBlock/>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        activeCategory: state.nav.activeCategory,
        toggleCartBlock: state.nav.toggleCartBlock,
    };
};

export default connect(mapStateToProps)(Nav);
