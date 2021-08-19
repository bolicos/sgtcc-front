import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Container, Button, Card } from "react-bootstrap";
import PageHeader from "#/components/PageHeader";
import { ROUTES } from "#/constants";
import { AUTH } from "#/helpers/Auth";
import {
  FcAnswers,
  FcClapperboard,
  FcCollaboration,
  FcConferenceCall,
  FcInspection,
  FcGraduationCap,
} from "react-icons/fc";

const Dashboard: React.FC = () => {
  const history = useHistory();
  const userPrincipal = useMemo(() => AUTH.USER_PRINCIPAL(), []);

  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <PageHeader title="Dashboard" />
          </Row>
          <Row>Bem vinde de volta _{userPrincipal?.name}_!</Row>
        </Col>

        <Col>
          <Card style={{ width: "18rem" }} onClick={() => history.push(ROUTES.PROPOSAL_CREATE())}>
            <FcAnswers size="5em" />
            <Card.Body>
              <Card.Title>Minhas Proposta</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Selecionar</Button>
            </Card.Body>
          </Card>
          <br></br>

          <Card style={{ width: "18rem" }}>
            <FcInspection size="5em" />
            <Card.Body>
              <Card.Title>Minhas Avaliações</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Selecionar</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ width: "18rem" }}>
            <FcClapperboard size="5em" />
            <Card.Body>
              <Card.Title>Minhas Bancas</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Selecionar</Button>
            </Card.Body>
          </Card>
          <br></br>

          <Card style={{ width: "18rem" }}>
            <FcGraduationCap size="5em" />
            <Card.Body>
              <Card.Title>Minhas Turmas</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Selecionar</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ width: "18rem" }}>
            <FcCollaboration size="5em" />
            <Card.Body>
              <Card.Title>Meus Colegas</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Selecionar</Button>
            </Card.Body>
          </Card>
          <br></br>

          <Card style={{ width: "18rem" }}>
            <FcConferenceCall size="5em" />
            <Card.Body>
              <Card.Title>Professores</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Selecionar</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
