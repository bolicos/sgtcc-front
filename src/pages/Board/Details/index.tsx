import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Button, Form, Spinner, ListGroup } from "react-bootstrap";
import PageHeader from "#/components/PageHeader";
import { DefaultState } from "#/models/default";
import { BoardDetailsModel } from "#/models/sgtcc";
import { API } from "#/services/sgtcc";
import { ROUTES } from "#/constants";

interface State extends DefaultState {
  board: BoardDetailsModel;
}

export const BoardDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<State>({
    loading: true,
    title: "Detalhes da banca",
    board: {} as BoardDetailsModel,
  });

  const boardDetails = useCallback(() => {
    API.BOARD.BOARD_DETAILS(id)
      .then((response) => {
        const board: BoardDetailsModel = response.data;
        setState((prev) => ({ ...prev, board: board }));
      })
      .catch((exception) => {
        console.log("Algo deu errado, erro: ", exception);
        throw new Error(exception.message);
      })
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }, [id]);

  useEffect(() => {
    boardDetails();
  }, [boardDetails]);

  return state.loading === true ? (
    <Spinner animation="grow" />
  ) : (
    <>
      <Container>
        <PageHeader title={state.title} />
        <Form>

          <Form.Group
            controlId="board.aclass.name"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Nome da turma:</Form.Label>
            <Form.Control type="text" value={state.board.aclass.name} disabled />
          </Form.Group>

          <Form.Group
            controlId="board.aclass.semester.name"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Semestre da turma:</Form.Label>
            <Form.Control type="text" value={state.board.aclass.semester.name} disabled />
          </Form.Group>

          <Form.Group
            controlId="board.aclass.teacher.email"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Email do professor da turma:</Form.Label>
            <Form.Control type="text" value={state.board.aclass.teacher.email} disabled />
          </Form.Group>

          <Form.Group
            controlId="board.aclass.teacher.name"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Nome do professor da turma:</Form.Label>
            <Form.Control type="text" value={state.board.aclass.teacher.name} disabled />
          </Form.Group>

          <Form.Group
            controlId="board.createdAt"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Banca foi criada em:</Form.Label>
            <Form.Control type="text" value={state.board.createdAt} disabled />
          </Form.Group>

          <Form.Group
            controlId="board.dateScheduled"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Data agendada:</Form.Label>
            <Form.Control type="text" value={state.board.dateScheduled} disabled />
          </Form.Group>

          <ListGroup>
            {state.board.evaluators.map((evaluator: any) => (
              <ListGroup.Item>{evaluator.name} - {evaluator.email}</ListGroup.Item>
            ))}
          </ListGroup>

          <Form.Group
            controlId="board.leader.email"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Email do professor da banca:</Form.Label>
            <Form.Control type="text" value={state.board.leader.email} disabled />
          </Form.Group>

          <Form.Group
            controlId="board.leader.name"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Nome do professor da banca:</Form.Label>
            <Form.Control type="text" value={state.board.leader.name} disabled />
          </Form.Group>

          <Form.Group
            controlId="board.proposal.author.email"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Email do autor da proposta da banca:</Form.Label>
            <Form.Control type="text" value={state.board.proposal.author.email} disabled />
          </Form.Group>

          <Form.Group
            controlId="board.proposal.author.name"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Nome do autor da proposta da banca:</Form.Label>
            <Form.Control type="text" value={state.board.proposal.author.name} disabled />
          </Form.Group>

          <Form.Group
            controlId="board.proposal.author.registration"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Matricula do autor da proposta da banca:</Form.Label>
            <Form.Control type="text" value={state.board.proposal.author.registration} disabled />
          </Form.Group>

          <Form.Group
            controlId="board.proposal.createdAt"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Proposta criada em:</Form.Label>
            <Form.Control type="text" value={state.board.proposal.createdAt} disabled />
          </Form.Group>

          <Form.Group
            controlId="board.proposal.leader.email"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Email do professor da proposta:</Form.Label>
            <Form.Control type="text" value={state.board.proposal.leader.email} disabled />
          </Form.Group>

          <Form.Group
            controlId="board.proposal.leader.name"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Nome do professor da proposta:</Form.Label>
            <Form.Control type="text" value={state.board.proposal.leader.name} disabled />
          </Form.Group>

          <Form.Group
            controlId="board.proposal.title"
            contentEditable={false}
            className="mb-3"
          >
            <Form.Label>Titulo da proposta:</Form.Label>
            <Form.Control type="text" value={state.board.proposal.title} disabled />
          </Form.Group>

          <Row className="justify-content-md-center">
            <Col sm={2}>
              <Button variant="secondary" size="lg" href={ROUTES.HOME()}>
                Voltar
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default BoardDetails;