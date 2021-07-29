import React from 'react'
import { Row, Col, Container, Button } from "react-bootstrap"
import PageHeader from "#/components/PageHeader";
import { ROUTES } from "#/constants"
import styles from './styles.module.scss'

export const Home: React.FC = () => {
  return(
    <Container>
      <PageHeader title="Sistema de Gerenciamento de TCC"/>
      <div className="buttons-home">
        <Row>
          <Col sm={2}>
            <Button variant="secondary" size="lg" href={ROUTES.SIGNIN()}>
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
