import React from "react";

import {connect} from "react-redux";
import {graphql} from "@apollo/client/react/hoc";

import {getProducts} from "../GraphQL/queries";
import ProductBlock from "../components/ProductBlock";
import LoadingSpinner from "../components/LoadingSpinner";
import {addToCart} from "../redux/actions/cart";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {added: false};
    }

    render() {
        const {
            data: {loading},
        } = this.props;

        const addToCartItem = (obj) => {
            this.props.dispatch(addToCart(obj));
            this.setState({
                added: true,
            });

            setTimeout(() => {
                this.setState({
                    added: false,
                });
            }, 2000);
        };

        if (loading) {
            return <LoadingSpinner/>;
        } else {
            return (
                <>
                    <div className=" home container">
                        <h1 className="home__category-name">{this.props.activeCategory}</h1>
                        <div className="home__products">
                            {this.props.data.category.products.map((product) => {
                                return (
                                    <ProductBlock
                                        key={product.id}
                                        outOfStock={!product.inStock}
                                        product={product}
                                        currency={this.props.activeCurrency}
                                        onAddToCart={addToCartItem}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div
                        className={`add-notification ${this.state.added ? "active" : ""}`}
                        ref={this.notificationRef}
                    >
                        Item Added to Cart!
                    </div>
                </>
            );
        }
    }
}

const mapStateToProps = function (state) {
    return {
        activeCategory: state.nav.activeCategory,
        activeCurrency: state.nav.activeCurrency,
    };
};

export default connect(mapStateToProps)(
    graphql(getProducts, {
        options: (props) => ({
            variables: {title: props.activeCategory ?? "all"},
        }),
    })(Home)
);
