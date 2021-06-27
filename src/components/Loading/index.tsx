import React from 'react'
import { Spinner } from "react-bootstrap"
import styles from './styles.module.scss'

export const Loading: React.FC = ({ children }) => {

    return (
        <>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </>
    );
}

export default Loading;