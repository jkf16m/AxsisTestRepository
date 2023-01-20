import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Pages/AfterLoggingIn/Layout';
import Home from './components/Pages/AfterLoggingIn/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.css'
import AnonymousRoutes from './components/AnonymousRoutes';
import LoggedInRoutes from './components/LoggedInRoutes';
import Login from './components/Pages/Login';

export default () => (

    <Layout>
        <AnonymousRoutes>
            <Route path='/login' component={Login} />
        </AnonymousRoutes>
        <LoggedInRoutes>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        </LoggedInRoutes>
    </Layout>
);
