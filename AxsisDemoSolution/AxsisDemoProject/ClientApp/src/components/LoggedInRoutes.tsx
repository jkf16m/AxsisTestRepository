import React, { ReactChild, ReactChildren, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Route } from 'react-router';
import { authService } from '../services/authService';
import { ApplicationState } from '../store';
import Counter from './Counter';
import FetchData from './FetchData';
import IfRenderer from './IfRenderer';
import Home from './Pages/AfterLoggingIn/Home';

interface ILoggedInRoutesProps {
    children: JSX.Element | JSX.Element[];
}
const LoggedInRoutes = () =>{
    return(
        <>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        </>
    );
}

export default LoggedInRoutes;