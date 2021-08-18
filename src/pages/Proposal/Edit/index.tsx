import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { ROUTES } from "#/constants";
import { API } from "#/services/sgtcc";
import { DefaultState } from "#/models/default";
import { ProposalEditRequest } from "#/models/request/proposal";
import PageHeader from "#/components/PageHeader";
import { TeacherDetailsModel, ProposalDetailsModel } from "#/models/sgtcc";

interface State extends DefaultState {
  teachers: Array<TeacherDetailsModel>;
  proposal: ProposalDetailsModel;
}

export const ProposalEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<State>({
    loading: true,
    title: "Editar proposta",
    teachers: [],
    proposal: {} as ProposalDetailsModel,
  });

  const validationSchema = Yup.object().shape({
    id: Yup.number().moreThan(0, "Id obrigatorio."),
    leader: Yup.number().moreThan(0, "Orientador obrigatorio."),
    title: Yup.string().required("Titulo obrigatorio."),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setValues } = useFormik<ProposalEditRequest>(
    {
      initialValues: {
        id: 0,
        leader: 0,
        title: "",
      },
      validationSchema: validationSchema,
      onSubmit() {
        editProposal();
      },
    }
  );

  const fetchTeachers = useCallback(() => {
    API.TEACHER.TEACHER_LIST()
      .then((response) => {
        const teachers: Array<TeacherDetailsModel> = response.data;
        setState((prev) => ({ ...prev, teachers: teachers }));
      })
      .catch((exception) => {
        console.log("Algo deu errado, erro: ", exception);
        throw new Error(exception.message);
      })
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }, []);

  const proposalDetails = useCallback(() => {
    API.PROPOSAL.PROPOSAL_DETAILS(id)
      .then((response) => {
        const proposal: ProposalDetailsModel = response.data;
        setState((prev) => ({ ...prev, proposal: proposal }));
        setValues((prev) => ({
          ...prev,
          id: proposal.id,
          leader: proposal.leader.id,
          title: proposal.title,
        }));
      })
      .catch((exception) => {
        console.log("Algo deu errado, erro: ", exception);
        throw new Error(exception.message);
      })
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const editProposal = useCallback(() => {
    API.PROPOSAL.PROPOSAL_EDIT(id, values)
      .then((response) => {
        const proposal: ProposalDetailsModel = response.data;
        setState((prev) => ({ ...prev, proposal: proposal }));
      })
      .catch((exception) => {
        console.log("Algo deu errado, erro: ", exception);
        throw new Error(exception.message);
      })
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }, [id, values]);

  useEffect(() => {
    fetchTeachers();
    proposalDetails();
  }, [fetchTeachers, proposalDetails]);

  return state.loading === true ? (
    <Spinner animation="grow" />
  ) : (
    <>
      <Container>
        <PageHeader title={state.title} />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="proposal.title">
            <Form.Label>Titulo:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.title && !!errors.title}
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="proposal.author" contentEditable={false} className="mb-3">
            <Form.Label>Autor:</Form.Label>
            <Form.Control type="text" value={state.proposal?.author?.name} disabled />
          </Form.Group>

          <Form.Group controlId="proposal.leader">
            <Form.Label>Orientador:</Form.Label>
            <Form.Control
              as="select"
              name="leader"
              value={values.leader}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.leader && !!errors.leader}>
              {state.teachers?.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.leader}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="proposal.createdAt" contentEditable={false} className="mb-3">
            <Form.Label>Criada em:</Form.Label>
            <Form.Control type="text" value={state.proposal.createdAt} disabled />
          </Form.Group>

          <Row className="justify-content-md-center">
            <Col sm={2}>
              <Button variant="secondary" size="lg" href={ROUTES.HOME()}>
                Cancelar
              </Button>
            </Col>
            <Col sm={2}>
              <Button variant="success" size="lg" type="submit">
                Editar
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default ProposalEdit;
