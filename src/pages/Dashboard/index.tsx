import React from 'react'
import { Container, Card, CardGroup, Button } from "react-bootstrap"
import PageHeader from "#/components/PageHeader";
import css from "./styles.module.scss";
import { ROUTES } from "#/constants"

export const Dashboard: React.FC = () => {
  return (
    <Container className={css["container-body"]}>
      <PageHeader title="Dashboard"/>

      {/* <CardGroup>
        <Card className={css["card"]}>
          <Card.Body className={css["card-body"]}>
            <Card.Title>Alunos</Card.Title>
            <Card.Text>
              Entre em contato com seus colegas
            </Card.Text>
          </Card.Body>

          <div className="d-grid gap-2">
            <Button href="" className={css["button-large"]} variant="success" size="lg">
              {'>'}
            </Button>
          </div>

        </Card>
        <Card className={css["card"]}>
          <Card.Body className={css["card-body"]}>
            <Card.Title>Professor</Card.Title>
            <Card.Text>
              Converse com seu professor
            </Card.Text>
          </Card.Body>

          <div className="d-grid gap-2">
            <Button className={css["button-large"]} variant="success" size="lg">
              {'>'}
            </Button>
          </div>
        </Card>
      </CardGroup> */}
      <div className={css["div"]}></div>
      <CardGroup >
        <Card className={css["card"]}>
          <Card.Body className={css["card-body"]}>
            <Card.Title>Propostas</Card.Title>
            <Card.Text>
              Gerencie suas propostas
            </Card.Text>
          </Card.Body>

          <div className="d-grid gap-2">
            <Button href={ROUTES.PROPOSAL_CREATE()} className={css["button-large"]} variant="success" size="lg">
              {'>'}
            </Button>
          </div>
        </Card>
        <Card className={css["card"]}>
          <Card.Body className={css["card-body"]}>
            <Card.Title>Avaliações</Card.Title>
            <Card.Text>
              Veja suas notas
            </Card.Text>
          </Card.Body>

          <div className="d-grid gap-2">
            <Button href={ROUTES.EXAMINATION_CREATE()} className={css["button-large"]} variant="success" size="lg">
              {'>'}
            </Button>
          </div>
        </Card>
        <Card className={css["card"]}>
          <Card.Body className={css["card-body"]}>
            <Card.Title>Bancas</Card.Title>
            <Card.Text>
              Acompanhe a data da sua banca
            </Card.Text>
          </Card.Body>

          <div className="d-grid gap-2">
            <Button href={ROUTES.BOARD_CREATE()} className={css["button-large"]} variant="success" size="lg">
              {'>'}
            </Button>
          </div>
        </Card>
      </CardGroup>
    </Container>
  )
}

export default Dashboard;
