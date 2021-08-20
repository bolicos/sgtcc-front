import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Container, Button, Spinner, Table } from "react-bootstrap";
import PageHeader from "#/components/PageHeader";
import { DefaultState } from "#/models/default";
import { ProposalDetailsModel } from "#/models/sgtcc";
import { API } from "#/services/sgtcc";
import { ROUTES } from "#/constants";
import { FaArrowAltCircleRight } from "react-icons/fa";
import css from "./styles.module.scss";

interface State extends DefaultState {
  proposals: Array<ProposalDetailsModel>;
}

const ProposalList: React.FC = () => {
  const history = useHistory();
  const [state, setState] = useState<State>({
    loading: true,
    title: "Minhas Propostas",
    proposals: [],
  });

  const proposals = useCallback(() => {
    API.PROPOSAL.PROPOSAL_LIST()
      .then((response) => {
        const proposals: Array<ProposalDetailsModel> = response.data;
        setState((prev) => ({ ...prev, proposals: proposals }));
      })
      .catch((exception) => {
        console.log("Algo deu errado, erro: ", exception);
      })
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }, []);

  useEffect(() => {
    proposals();
  }, [proposals]);

  return state.loading === true ? (
    <Spinner animation="border" />
  ) : (
    <>
      <Container>
        <PageHeader title={state.title} />
        <Row>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Titulo</th>
                <th>Criada em</th>
                <th>Orientador</th>
                <th>Ver</th>
              </tr>
            </thead>
            <tbody>
              {state.proposals?.map((item: ProposalDetailsModel) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.leader?.name}</td>
                  <td>
                    <FaArrowAltCircleRight
                      size="2em"
                      className={css["button-details"]}
                      onClick={() => history.push(ROUTES.PROPOSAL_DETAILS(String(item.id)))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>

        <Row className="justify-content-md-center">
          <Col sm={2}>
            <Button variant="secondary" size="lg" href={ROUTES.DASHBOARD()}>
              Voltar
            </Button>
          </Col>
          <Col sm={2}>
            <Button variant="success" size="lg" href={ROUTES.PROPOSAL_CREATE()}>
              Nova Proposta
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProposalList;
