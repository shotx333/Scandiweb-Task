import React from "react";
import {getCategories} from "../../GraphQL/queries";
import {graphql} from "@apollo/client/react/hoc";
import {connect} from "react-redux";

import {Link} from "react-router-dom";

import {activeCategory} from "../../redux/actions/nav";

class Categories extends React.Component {
    render() {
        const handleClick = (category) => {
            this.props.dispatch(activeCategory(category));
        };

        const {
            data: {loading, categories},
        } = this.props;
        if (loading) {
            return <></>;
        } else {
            return (
                <ul className="nav__categories">
                    {categories.map((category) => {
                        return (
                            <li
                                className={`nav__categories-item ${
                                    this.props.activeCategory === category.name ? "active" : ""
                                }`}
                                key={category.name}
                            >
                                <Link
                                    to="/"
                                    onClick={() => {
                                        handleClick(category.name);
                                    }}
                                >
                                    {category.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            );
        }
    }
}

const mapStateToProps = function (state) {
    return {
        activeCategory: state.nav.activeCategory,
    };
};

export default connect(mapStateToProps)(graphql(getCategories)(Categories));
