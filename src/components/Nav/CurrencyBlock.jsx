import React from "react";

import {connect} from "react-redux";
import {graphql} from "@apollo/client/react/hoc";

import {activeCurrency, toggleCurrencyBlock} from "../../redux/actions/nav";
import {getCurrencies} from "../../GraphQL/queries";

import arrowIco from "../../assets/icons/v-shape.png";

class CurrencyBlock extends React.Component {
    constructor(props) {
        super(props);
        this.currencyPopupRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener("click", this.closeBlock);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.closeBlock);
    }

    render() {
        const toggleBlock = () => {
            this.props.dispatch(toggleCurrencyBlock());
        };

        this.closeBlock = (e) => {
            this.props.toggleCurrencyBlock &&
            !e.path.includes(this.currencyPopupRef.current) &&
            this.props.dispatch(toggleCurrencyBlock(false));
        };

        const {
            data: {loading, currencies},
        } = this.props;

        const setActiveCurrency = (currency) => {
            this.props.dispatch(activeCurrency(currency));
        };

        if (loading) {
            return <></>;
        } else {
            return (
                <div
                    className="nav__currency"
                    ref={this.currencyPopupRef}
                    onClick={toggleBlock}
                >
                    <div className="nav__currency-label">
                        {this.props.activeCurrency} <img src={arrowIco} alt=""/>
                    </div>
                    <ul
                        className={`nav__currency-items ${
                            this.props.toggleCurrencyBlock ? "active" : ""
                        }`}
                    >
                        {currencies.map((currency) => {
                            return (
                                <li
                                    key={currency.label}
                                    onClick={() => {
                                        setActiveCurrency(currency.symbol);
                                    }}
                                >
                                    {currency.symbol} {currency.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }
    }
}

const mapStateToProps = function (state) {
    return {
        toggleCurrencyBlock: state.nav.toggleCurrencyBlock,
        activeCurrency: state.nav.activeCurrency,
    };
};

export default connect(mapStateToProps)(
    graphql(getCurrencies)(CurrencyBlock)
);
