import React, { ReactChildren } from 'react';
import { connect } from 'react-redux';

interface IAnonymousRoutesProps {
    children: JSX.Element | JSX.Element[];
}
const AnonymousRoutes = ({children}:IAnonymousRoutesProps) => (
    <div>
        {children}
    </div>
);

export default connect()(AnonymousRoutes);