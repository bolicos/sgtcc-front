import React, { useMemo } from "react";
import { Row, Col, Container, Button, Card } from "react-bootstrap";
import PageHeader from "#/components/PageHeader";
import { ROUTES } from "#/constants";
import { AUTH } from "~/src/helpers/Auth";
import { useHistory } from "react-router-dom";

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
          <Row>Bem vinde de volta {userPrincipal?.name}!</Row>
        </Col>

        <Col>
          <Card style={{ width: "18rem" }} onClick={() => history.push(ROUTES.PROPOSAL_CREATE())}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Minhas Proposta</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Minhas Avaliações</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Fbr%2Ficone-gratis%2Fproposta_1522794&psig=AOvVaw3emNS-ishABDEOn4iymfdU&ust=1629499061567000&source=images&cd=vfe&ved=2ahUKEwi9vYqXk77yAhXTAdQKHVCHAMEQjRx6BAgAEAo"
            />
            <Card.Body>
              <Card.Title>Minhas Bancas</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Fbr%2Ficone-gratis%2Fproposta_1522794&psig=AOvVaw3emNS-ishABDEOn4iymfdU&ust=1629499061567000&source=images&cd=vfe&ved=2ahUKEwi9vYqXk77yAhXTAdQKHVCHAMEQjRx6BAgAEAo"
            />
            <Card.Body>
              <Card.Title>Minhas Bancas</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
