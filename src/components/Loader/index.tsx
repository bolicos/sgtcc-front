import React from 'react'
import { Spinner } from "react-bootstrap"

export const Loader: React.FC = ({ children }) => {

    return (
        <>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </>
    );
}

export default Loader;