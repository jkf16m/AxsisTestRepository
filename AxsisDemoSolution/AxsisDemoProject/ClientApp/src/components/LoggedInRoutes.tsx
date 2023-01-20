import React, { ReactChild, ReactChildren } from 'react';
import { connect } from 'react-redux';

interface ILoggedInRoutesProps {
    children: JSX.Element | JSX.Element[];
}
const LoggedInRoutes = ({children}:ILoggedInRoutesProps) => (
    <div>
        {children}
    </div>
);

export default connect()(LoggedInRoutes);