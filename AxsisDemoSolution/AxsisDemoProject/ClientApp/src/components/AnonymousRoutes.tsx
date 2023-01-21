import React, { ReactChildren, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Route } from 'react-router';
import { authService } from '../services/authService';
import { ApplicationState } from '../store';
import IfRenderer from './IfRenderer';
import AnonymousLayout from './Pages/AnonymousLayout';
import Login from './Pages/Login';

interface IAnonymousRoutesProps {
    children: JSX.Element | JSX.Element[];
}
const AnonymousRoutes = () => {
return(
    <>
        <AnonymousLayout>
            <Route exact path='/' component={Login} />
            <Route path='/login' component={Login} />
        </AnonymousLayout>
    </>
);}

export default AnonymousRoutes;