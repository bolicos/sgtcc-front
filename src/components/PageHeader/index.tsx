import React from 'react';
import { Row } from "react-bootstrap"

import styles from './styles.module.scss'

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <header className={styles["page-header"]}>
      <Row>
        <h1 id={styles["logo-tcc"]}>SgTCC</h1>
      </Row>
      <Row>
        <h2>{props.title}</h2>
      </Row>
    </header>
  );
}

export default PageHeader;
