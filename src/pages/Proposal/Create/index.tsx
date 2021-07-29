import React from 'react'
import { Row, Col, Container, Button, Form } from "react-bootstrap"
import PageHeader from "#/components/PageHeader";
import { ROUTES } from "#/constants"
import styles from './styles.module.scss'

export const Create: React.FC = () => {
  return(
    <Container>
      <PageHeader title="Criar Proposta"/>
      
        {/* titulo
        autor
        orientador */}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" placeholder="Digite o título da Proposta" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label> Selecione o Autor</Form.Label>
          <Form.Control as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group> 

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label> Selecione o Orientador</Form.Label>
          <Form.Control as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group> 

        <div className="buttons-home">
          <Row>
            <Col sm={2}>
              <Button variant="secondary" size="lg" href={ROUTES.SIGNIN()}>
                Cancelar
              </Button>
            </Col>
            <Col sm={2}>
              <Button variant="success" size="lg">
                Criar
              </Button>
            </Col>
          </Row>
        </div>
      </Form>  
    </Container>
  )
}

export default Create;
