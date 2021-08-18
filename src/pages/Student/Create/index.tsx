import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { DefaultState } from "#/models/default";
import PageHeader from "#/components/PageHeader";
import { StudentRequest } from "#/models/request/student";
import { ResourceCreate } from "#/models/resource/created";
import { API } from "#/services/sgtcc";
import { ROUTES } from "#/constants";
import css from "./styles.module.scss";

export const StudentCreate: React.FC = () => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState<DefaultState>({
    loading: false,
    title: "Criar Aluno",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nome obrigatorio."),
    cpf: Yup.string().required("CPF obrigatorio."),
    email: Yup.string().required("E-mail obrigatorio."),
    phone: Yup.string().required("Celular obrigatorio."),
    registration: Yup.string().required("Matricula obrigatoria."),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik<StudentRequest>({
    initialValues: {
      name: "",
      cpf: "",
      email: "",
      phone: "",
      registration: "",
    },
    validationSchema: validationSchema,
    onSubmit() {
      sendStudent();
    },
  });

  const sendStudent = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true }));
    API.STUDENT.STUDENT_CREATE(values)
      .then((response) => {
        const resourceCreated: ResourceCreate = response.data;
        handleShow();
        console.log("resourceCreated: ", resourceCreated);
      })
      .catch((exception) => {
        console.log("Algo deu errado, erro: ", exception);
        throw new Error(exception.message);
      })
      .finally(() => {
        resetForm();
        setState((prev) => ({ ...prev, loading: false }));
      });
  }, [values, resetForm]);

  return state.loading === true ? (
    <Spinner animation="grow" />
  ) : (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={css["modal-title"]}>Notificacao:</Modal.Title>
        </Modal.Header>
        <Modal.Body className={css["modal-body"]}>Aluno salvo com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <PageHeader title={state.title} />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="student.name">
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Digite o nome do Aluno"
              isInvalid={touched.name && !!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="student.email">
            <Form.Label>E-mail:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="aluno@mail.com"
              isInvalid={touched.email && !!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="student.cpf">
            <Form.Label>CPF:</Form.Label>
            <Form.Control
              type="cpf"
              name="cpf"
              maxLength={14}
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              value={values.cpf}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="000.000.000-00"
              isInvalid={touched.cpf && !!errors.cpf}
            />
            <Form.Control.Feedback type="invalid">{errors.cpf}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="student.phone">
            <Form.Label>Celular:</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              maxLength={14}
              pattern="\(\d{2}\)\s*\d{5}-\d{4}"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="(00) 00000-0000"
              isInvalid={touched.phone && !!errors.phone}
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="student.registration">
            <Form.Label>Matricula:</Form.Label>
            <Form.Control
              type="text"
              name="registration"
              value={values.registration}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Digite a matricula do Aluno"
              isInvalid={touched.registration && !!errors.registration}
            />
            <Form.Control.Feedback type="invalid">{errors.registration}</Form.Control.Feedback>
          </Form.Group>

          <Row className="justify-content-md-center">
            <Col sm={2}>
              <Button variant="secondary" size="lg" href={ROUTES.HOME()}>
                Cancelar
              </Button>
            </Col>
            <Col sm={2}>
              <Button variant="success" size="lg" type="submit">
                Criar
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default StudentCreate;