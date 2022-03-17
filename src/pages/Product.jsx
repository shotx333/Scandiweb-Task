import React from "react";

import {withRouter} from "react-router-dom/cjs/react-router-dom.min";
import {graphql} from "@apollo/client/react/hoc";
import {connect} from "react-redux";
import {getProduct} from "../GraphQL/queries";
import {setActiveImg, setActiveParams, unsetParams,} from "../redux/actions/product";
import {addToCart} from "../redux/actions/cart";
import LoadingSpinner from "../components/LoadingSpinner";

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {added: false};
    }

    componentDidMount() {
        this.props.dispatch(setActiveImg());
        this.props.dispatch(unsetParams());

        this.props.data.loading === false &&
        this.props.data.product.attributes.map((param) => {
            this.props.dispatch(
                setActiveParams({
                    paramName: param.name,
                    paramValue: param.items[0].value,
                })
            );
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.data.loading !== prevProps.data.loading) {
            this.props.data.product.attributes.map((param) => {
                this.props.dispatch(
                    setActiveParams({
                        paramName: param.name,
                        paramValue: param.items[0].value,
                    })
                );
            });
        }
    }

    render() {
        const {
            data: {loading, product},
        } = this.props;

        const clickImg = (src) => {
            this.props.dispatch(setActiveImg(src));
        };
        const setParams = (obj) => {
            this.props.dispatch(setActiveParams(obj));
        };

        const addCartItem = (obj) => {
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
                    <div className="container product">
                        <div className="product__thumbs">
                            {product.gallery.map((photo, idx) => {
                                return (
                                    <img
                                        src={photo}
                                        key={idx}
                                        alt=""
                                        className="product__thumbs-img"
                                        onClick={() => {
                                            clickImg(photo);
                                        }}
                                    />
                                );
                            })}
                        </div>
                        <div className="product__img">
                            <img
                                src={this.props.activeImg ?? product.gallery[0]}
                                alt=""
                                className="product__thumbs-img"
                            />
                        </div>
                        <div className="product__info">
                            <h3 className="product__info-subtitle">{product.brand}</h3>
                            <h2 className="product__info-title">{product.name}</h2>
                            <div className="product__params">
                                {product.attributes.length > 0 &&
                                product.attributes.map((attribute, idx) => {
                                    return (
                                        <React.Fragment key={idx}>
                                            <p className="product__params-title">
                                                {attribute.name}:
                                            </p>
                                            {attribute.type === "text" ? (
                                                <div className="product__params-btns">
                                                    {attribute.items.map((item, idx) => {
                                                        return (
                                                            <button
                                                                className={`btn ${
                                                                    this.props.activeParams.find(
                                                                        (param) =>
                                                                            param.paramName === attribute.name &&
                                                                            param.paramValue === item.value
                                                                    )
                                                                        ? "selected"
                                                                        : ""
                                                                }`}
                                                                key={idx}
                                                                onClick={() => {
                                                                    setParams({
                                                                        paramName: attribute.name,
                                                                        paramValue: item.value,
                                                                    });
                                                                }}
                                                            >
                                                                {item.value}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="product__params-swatch">
                                                    {attribute.items.map((item, idx) => {
                                                        return (
                                                            <button
                                                                style={{
                                                                    backgroundColor: item.value,
                                                                }}
                                                                className={`swatch-btn $ ${
                                                                    this.props.activeParams.find(
                                                                        (param) =>
                                                                            param.paramName === attribute.name &&
                                                                            param.paramValue === item.value
                                                                    )
                                                                        ? "selected"
                                                                        : ""
                                                                }`}
                                                                key={idx}
                                                                onClick={() => {
                                                                    setParams({
                                                                        paramName: attribute.name,
                                                                        paramValue: item.value,
                                                                    });
                                                                }}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                            <div className="product__price">
                                <p className="product__price-title">PRICE:</p>
                                <span>
                  {this.props.currency + " "}
                                    {
                                        product.prices.filter(
                                            (price) => price.currency.symbol === this.props.currency
                                        )[0].amount
                                    }
                </span>
                            </div>
                            <button
                                className="btn primary add-btn"
                                disabled={!product.inStock}
                                onClick={() => {
                                    addCartItem({
                                        id: product.id,
                                        itemName: product.name,
                                        itemBrand: product.brand,
                                        itemGallery: product.gallery,
                                        itemPrice: product.prices,
                                        params: [...this.props.activeParams],
                                    });
                                }}
                            >
                                {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
                            </button>
                            <div
                                className="product__desc"
                                dangerouslySetInnerHTML={{__html: product.description}}
                            />
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
        activeImg: state.product.activeImg,
        activeParams: state.product.activeParams,
        currency: state.nav.activeCurrency,
    };
};

export default connect(mapStateToProps)(
    withRouter(
        graphql(getProduct, {
            options: (props) => ({variables: {id: props.match.params.id}}),
        })(Product)
    )
);
