import React from 'react';
import { Row } from "react-bootstrap"
//importa o arquivo de estilo especifico do componente
import styles from './styles.module.scss'

//recebe o titulo como parametro na chamada do componente
interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    //adiciona classe de estilo especifica do header
    <header className={styles["page-header"]}>
      <Row>
        <h1 id={styles["logo-tcc"]}>SgTCC</h1>
      </Row>
      <Row>
        {/* pega dos parametros recebidos a propriedade de titulo */}
        <h2>{props.title}</h2>
      </Row>
    </header>
  );
}

export default PageHeader;
