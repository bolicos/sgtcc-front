import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Row, Col, Container, Button, Form, Spinner, Modal } from "react-bootstrap";
import PageHeader from "#/components/PageHeader";
import { ROUTES } from "#/constants";
import { API } from "#/services/sgtcc";
import { ClassDetailsModel, TeacherDetailsModel, ProposalDetailsModel } from "#/models/sgtcc";
import { BoardRequest } from "#/models/request/board";
import { ResourceCreate } from "#/models/resource/created";
import { DefaultState } from "#/models/default";
import css from "./styles.module.scss";

interface State extends DefaultState {
  classes: Array<ClassDetailsModel>;
  teachers: Array<TeacherDetailsModel>;
  proposals: Array<ProposalDetailsModel>;
}

export const BoardCreate: React.FC = () => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState<State>({
    loading: true,
    title: "Criar Banca",
    classes: [],
    teachers: [],
    proposals: []
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = Yup.object().shape({
    aclass: Yup.number().moreThan(0, "Turma obrigatorio."),
    date: Yup.string().required("Data obrigatoria"),
    leader: Yup.number().moreThan(0, "Orientador obrigatorio."),
    proposal: Yup.number().moreThan(0, "Proposta obrigatoria."),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik<BoardRequest>({
    initialValues: {
      aclass: 0,
      date: "",
      leader: 0,
      proposal: 0,
    },
    validationSchema: validationSchema,
    onSubmit() {
      sendBoard();
    },
  });

  const fetchClasses = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    API.CLASS.CLASS_LIST()
      .then((response) => {
        const classes: Array<ClassDetailsModel> = response.data;
        setState((prev) => ({ ...prev, classes: classes }));
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
    setState((prev) => ({ ...prev, loading: true }));
    API.TEACHER.TEACHER_LIST()
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

  const fetchProposals = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    API.PROPOSAL.PROPOSAL_LIST()
      .then((response) => {
        const proposals: Array<ProposalDetailsModel> = response.data;
        setState((prev) => ({ ...prev, proposals: proposals }));
      })
      .catch((exception) => {
        console.log("Algo deu errado, erro: ", exception);
        throw new Error(exception.message);
      })
      .finally(() => {
        setState((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  const sendBoard = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true }));
    API.BOARD.BOARD_CREATE(values)
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

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
    fetchProposals();
  }, [fetchClasses, fetchTeachers, fetchProposals]);

  return state.loading === true ? (
    <Spinner animation="grow" />
  ) : (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={css["modal-title"]}>Notificacao:</Modal.Title>
        </Modal.Header>
        <Modal.Body className={css["modal-body"]}>Banca salva com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <PageHeader title={state.title} />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="board.title">
            <Form.Group controlId="board.aclass">
              <Form.Label> Selecione a turma:</Form.Label>
              <Form.Control
                as="select"
                name="aclass"
                value={values.aclass}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.aclass && !!errors.aclass}>
                <option key="0" value="0">
                  Selecione uma turma
                </option>
                {state.classes.map((aclass: any) => (
                  <option key={aclass.id} value={aclass.id}>
                    {aclass.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.aclass}</Form.Control.Feedback>
            </Form.Group>

            <Form.Label>Data:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Digite a data"
              isInvalid={touched.date && !!errors.date}
            />
            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="board.leader">
            <Form.Label> Selecione o Orientador:</Form.Label>
            <Form.Control
              as="select"
              name="leader"
              value={values.leader}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.leader && !!errors.leader}>
              <option key="0" value="0">
                Selecione um orientador
              </option>
              {state.teachers?.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.leader}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="board.proposal">
            <Form.Label> Selecione a Proposta:</Form.Label>
            <Form.Control
              as="select"
              name="proposal"
              value={values.proposal}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.proposal && !!errors.proposal}>
              <option key="0" value="0">
                Selecione uma proposta
              </option>
              {state.proposals?.map((proposal) => (
                <option key={proposal.id} value={proposal.id}>
                  {proposal.title}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.proposal}</Form.Control.Feedback>
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

export default BoardCreate;
