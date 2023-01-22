import React, { ReactChildren, useEffect, useState } from 'react';
import AnonymousLayout from './Pages/AnonymousLayout';
import Login from './Pages/Login';

interface IAnonymousRoutesProps {
    children: JSX.Element | JSX.Element[];
}
const AnonymousRoutes = () => {
return(
    <>
        <AnonymousLayout>
        </AnonymousLayout>
    </>
);}

export default AnonymousRoutes;