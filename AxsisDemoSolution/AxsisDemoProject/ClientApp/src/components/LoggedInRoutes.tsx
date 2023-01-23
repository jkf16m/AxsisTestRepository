import React, { ReactChild, ReactChildren, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Route } from 'react-router';
import { authService } from '../services/authService';
import IfRenderer from './IfRenderer';
import UsersScreen from './Pages/AfterLoggingIn/UsersScreen';
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