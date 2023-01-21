import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import NavMenu from './AfterLoggingIn/NavMenu';

const AnonymousLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className={"container h-100 w-100"}
                
            >
                {/* <Row></Row> */}
                <div className='row h-100 align-items-center'
                    style={{marginTop:'auto'}}
                >
                    <div className=
                    'col-sm-1 col-md-2 col-lg-4 col-xl-4 '
                    ></div>
                    <div
                    className="col-xs-10 col-sm-10 col-md-8 col-lg-4 col-xl-4">
                        {children}
                    </div>
                    <div className=
                    'col-sm-1 col-md-2 col-lg-4 col-xl-4'
                    ></div>
                </div>
                {/* <Row></Row> */}
            </div>
        </>
    );
}
export default AnonymousLayout;