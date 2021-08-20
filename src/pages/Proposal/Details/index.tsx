import React, { useCallback, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Container, Button, Form, Spinner } from "react-bootstrap";
import PageHeader from "#/components/PageHeader";
import { DefaultState } from "#/models/default";
import { ProposalDetailsModel } from "#/models/sgtcc";
import { API } from "#/services/sgtcc";

interface State extends DefaultState {
  proposal: ProposalDetailsModel;
}

export const ProposalDetails: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<State>({
    loading: true,
    title: "Detalhes da proposta",
    proposal: {} as ProposalDetailsModel,
  });

  const proposalDetails = useCallback(() => {
    API.PROPOSAL.PROPOSAL_DETAILS(id)
      .then((response) => {
        const proposal: ProposalDetailsModel = response.data;
        setState((prev) => ({ ...prev, proposal: proposal }));
      })
      .catch((exception) => {
        console.log("Algo deu errado, erro: ", exception);
        throw new Error(exception.message);
      })
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }, [id]);

  useEffect(() => {
    proposalDetails();
  }, [proposalDetails]);

  return state.loading === true ? (
    <Spinner animation="grow" />
  ) : (
    <>
      <Container>
        <PageHeader title={state.title} />
        <Form>
          <Form.Group controlId="proposal.title" contentEditable={false} className="mb-3">
            <Form.Label>Título:</Form.Label>
            <Form.Control type="text" value={state.proposal.title} disabled />
          </Form.Group>

          <Form.Group controlId="proposal.author" contentEditable={false} className="mb-3">
            <Form.Label>Autor:</Form.Label>
            <Form.Control type="text" value={state.proposal.author.name} disabled />
          </Form.Group>

          <Form.Group controlId="proposal.leader" contentEditable={false} className="mb-3">
            <Form.Label>Orientador:</Form.Label>
            <Form.Control type="text" value={state.proposal.leader.name} disabled />
          </Form.Group>

          <Form.Group controlId="proposal.createdAt" contentEditable={false} className="mb-3">
            <Form.Label>Criada em:</Form.Label>
            <Form.Control type="text" value={state.proposal.createdAt} disabled />
          </Form.Group>

          <Row className="justify-content-md-center">
            <Col sm={2}>
              <Button variant="secondary" size="lg" onClick={() => history.goBack()}>
                Voltar
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default ProposalDetails;
