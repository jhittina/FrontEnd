// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App/App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//     <App />,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

// import React, { createRoot } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App/App";
// import { Provider } from 'react-redux'

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);


import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App/App'
import { store } from './store/store'

const rootElement = document.getElementById('root')
render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)