import React, { ReactChild, ReactChildren, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Route } from 'react-router';
import { authService } from '../services/authService';
import { ApplicationState } from '../store';
import IfRenderer from './IfRenderer';
import Home from './Pages/AfterLoggingIn/Home';
import Layout from './Pages/AfterLoggingIn/Layout';

interface ILoggedInRoutesProps {
    children: JSX.Element | JSX.Element[];
}
const LoggedInRoutes = () =>{
    return(
        <>
                
        </>
    );
}

export default LoggedInRoutes;