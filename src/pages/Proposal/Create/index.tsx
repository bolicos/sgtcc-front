import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Container, Button, Form } from "react-bootstrap"
import PageHeader from "#/components/PageHeader"
import { ROUTES } from "#/constants"
import styles from './styles.module.scss'
import api from '#/services/api'

// interface State {
//   loading: boolean;
//   students: Array<Student>;
// };

export const Create: React.FC = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = useCallback(async () => {
    setStudents((prev) => ({ ...prev, loading: true }));
    
    api
      .get("/api/v1/students")
      .then((response) => { setStudents((prev) => ({ ...prev, students: response.data }));
    }).catch((exception) => {
      throw new Error(exception.message);
    }).finally(() => {
      setStudents((prev) => ({ ...prev, loading: false }));
    });
  }, [students]);

  useEffect(() => {
    fetchStudents();
  },[fetchStudents]);

  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = useCallback(async () => {
    setTeachers((prev) => ({ ...prev, loading: true }));
    
    api
      .get("/api/v1/teachers")
      .then((response) => { setTeachers((prev) => ({ ...prev, teachers: response.data }));
    }).catch((exception) => {
      throw new Error(exception.message);
    }).finally(() => {
      setTeachers((prev) => ({ ...prev, loading: false }));
    });
  }, [teachers]);

  useEffect(() => {
    fetchTeachers();
  },[fetchTeachers]);

  return(
    <Container>
      <PageHeader title="Criar Proposta"/>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" placeholder="Digite o título da Proposta" />
        </Form.Group>

        <Form.Group controlId="proposal.author">
          <Form.Label> Selecione o Autor</Form.Label>
          <Form.Control as="select">
            {students?.map((student) => {
              <option>student</option>
            })}
          </Form.Control>
        </Form.Group> 

        <Form.Group controlId="proposal.advisor">
          <Form.Label> Selecione o Orientador</Form.Label>
          <Form.Control as="select">
          {teachers?.map((teacher) => {
              <option>teacher</option>
            })}
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
