import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

import store, {Persist} from "./redux/store";

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={Persist}>
                    <App/>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("root")
);
