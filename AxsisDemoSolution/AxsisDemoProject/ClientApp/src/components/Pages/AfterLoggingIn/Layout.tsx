import * as React from 'react';
import NavMenu from '../../NavMenu';

export default class Layout extends React.PureComponent<{}, { children?: React.ReactNode }> {
    public render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='row'>
                        <div className = 'col'>
                            <NavMenu/>
                        </div>
                        <div className = 'col'>
                            {this.props.children}   
                        </div>     
                    </div>
                </div>
            </React.Fragment>
        );
    }
}