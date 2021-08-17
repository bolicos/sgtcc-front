import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Container, Button, Form, Spinner } from "react-bootstrap";
import PageHeader from "#/components/PageHeader";
import { ROUTES } from "#/constants";
import { API } from "#/services/sgtcc";
import { StudentDetailsModel, TeacherDetailsModel } from "#/models/sgtcc";

interface State {
  loading: boolean;
  title: string;
  students: Array<StudentDetailsModel>;
  teachers: Array<TeacherDetailsModel>;
}

export const Create: React.FC = () => {
  const [state, setState] = useState<State>({
    loading: true,
    title: "Criar Proposta",
    students: [],
    teachers: [],
  });

  const fetchStudents = useCallback(async () => {
    API.student_list()
      .then((response) => {
        const students: Array<StudentDetailsModel> = response.data;
        setState((prev) => ({ ...prev, students: students }));
      })
      .catch((exception) => {
        console.log("Algo deu errado, erro: ", exception);
        throw new Error(exception.message);
      })
      .finally(() => {
        setState((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  const fetchTeachers = useCallback(async () => {
    API.teacher_list()
      .then((response) => {
        const teachers: Array<TeacherDetailsModel> = response.data;
        setState((prev) => ({ ...prev, teachers: teachers }));
      })
      .catch((exception) => {
        console.log("Algo deu errado, erro: ", exception);
        throw new Error(exception.message);
      })
      .finally(() => {
        setState((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, [fetchStudents, fetchTeachers]);

  return state.loading === true ? (
    <Spinner animation="grow" />
  ) : (
    <Container>
      <PageHeader title={state.title} />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" placeholder="Digite o título da Proposta" />
        </Form.Group>

        <Form.Group controlId="proposal.author">
          <Form.Label> Selecione o Autor</Form.Label>
          <Form.Control as="select">
            {state.students.map((student) => (
              <option>{student.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="proposal.advisor">
          <Form.Label> Selecione o Orientador</Form.Label>
          <Form.Control as="select">
            {state.teachers?.map((teacher) => (
              <option>{teacher.name}</option>
            ))}
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
  );
};

export default Create;
