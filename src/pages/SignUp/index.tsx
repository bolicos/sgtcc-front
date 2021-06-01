import React, { Fragment, useState } from 'react'
import styles from './styles.module.scss'

export const SignUp: React.FC = () => {
    const [isLoading, setLoading] = useState(false);

    return (
        <>
            {isLoading
                ? <p>Loading</p>
                : <Fragment>
                    <div>
                        <h1 className={styles["title"]}>SignUp</h1>
                    </div>
                </Fragment>
            }
        </>
    );
}

export default SignUp;