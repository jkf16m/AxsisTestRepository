import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

// Create browser history to use in the Redux store
// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
// const history = createBrowserHistory();

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore();
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <BrowserRouter>
        {/* <ConnectedRouter history={history}> */}
            <App />
        {/* </ConnectedRouter> */}
        </BrowserRouter>
    </Provider>
);

registerServiceWorker();
