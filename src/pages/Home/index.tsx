import React, { Fragment, useState } from 'react'
import styles from './styles.module.scss'

export const Home: React.FC = () => {
    const [isLoading, setLoading] = useState(false);

    return (
        <>
            {isLoading
                ? <p>Loading</p>
                : <Fragment>
                    <div>
                        <h1 className={styles["title"]}>Home</h1>
                        <p>Paragrafo</p>
                    </div>
                </Fragment>
            }
        </>
    );
}

export default Home;