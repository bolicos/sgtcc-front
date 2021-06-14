import React from 'react'
import { Row, Col, Container, Button } from "react-bootstrap"
import styles from './styles.module.scss'

export const Home: React.FC = () => {
  return(
    <Container>
      <Row>
        <h1 id={styles["logo-tcc"]}>SgTCC</h1>
      </Row>
      <Row>
        <h2>Sistema de Gerenciamento de TCC</h2>
      </Row>
      <div className="buttons-home">
        <Row>
          <Col sm={2}>
            <Button variant="secondary" size="lg">
              Signin
            </Button>
          </Col>
          <Col sm={2}>
            <Button variant="success" size="lg">
              Signup
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default Home;
