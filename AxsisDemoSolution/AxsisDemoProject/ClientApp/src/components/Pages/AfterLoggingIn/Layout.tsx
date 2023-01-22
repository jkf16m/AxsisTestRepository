import * as React from 'react';
import NavMenu from './NavMenu';

const Layout = ({children}:{ children?: React.ReactNode })=> {
    
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='row'>
                        <div className = 'col'>
                            {children}   
                        </div>     
                    </div>
                </div>
            </React.Fragment>
        );
}

export default Layout;