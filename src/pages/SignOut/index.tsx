import React, { Fragment, useState } from 'react'
import styles from './styles.module.scss'

export const SignOut: React.FC = () => {
    const [isLoading, setLoading] = useState(false);

    return (
        <>
            {isLoading
                ? <p>Loading</p>
                : <Fragment>
                    <div>
                        <h1 className={styles["title"]}>SignOut</h1>
                    </div>
                </Fragment>
            }
        </>
    );
}

export default SignOut;