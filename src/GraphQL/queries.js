import {gql} from "@apollo/client";

export const getCategories = gql`
  query {
    categories {
      name
    }
  }
`;

export const getProducts = gql`
  query Category($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        name
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          name
          items {
            value
          }
        }
      }
    }
  }
`;

export const getCurrencies = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const getProduct = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      brand
      name
      inStock
      gallery
      description
      attributes {
        name
        type
        items {
          value
        }
      }

      prices {
        currency {
          label
          symbol
        }
        amount
      }
      inStock
    }
  }
`;
