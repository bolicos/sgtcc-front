import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Col, Row, Container, Spinner, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User } from "#/models/user";
import { API } from "#/services/auth";
import PageHeader from "#/components/PageHeader";
import css from "./styles.module.scss";
import { DefaultState } from "#/models/default";
import { JwtToken } from "#/models/response/user";
import { SignInProps } from "#/models/props/auth";
import { ROUTES } from "#/constants";

interface State extends DefaultState {
  isAuthenticated: boolean;
}

export const SignIn: React.FC<SignInProps> = ({ success }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [state, setState] = useState<State>({
    loading: true,
    title: "SignIn",
    isAuthenticated: false,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const schema = Yup.object().shape({
    username: Yup.string().required("Preencha o campo para continuar."),
    password: Yup.string().required("Preencha o campo para continuar."),
  });

  const { errors, handleBlur, handleChange, handleSubmit, values, touched } = useFormik<User>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: () => {
      signIn();
    },
  });

  const signIn = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true }));
    API.AUTH.SIGN_IN(values)
      .then((response) => {
        const token: JwtToken = response.data;
        setState((prev) => ({ ...prev, isAuthenticated: success(token.jwt) }));
      })
      .catch((exception) => {
        handleShow();
        console.log("Algo deu errado, erro: ", exception);
      })
      .finally(() => {
        setState((prev) => ({ ...prev, loading: false }));
      });
  }, [values, success]);

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: false }));
  }, []);

  useEffect(() => {
    if (state.isAuthenticated) {
      history.push(ROUTES.DASHBOARD());
    }
  }, [history, state.isAuthenticated]);

  return state.loading === true ? (
    <Spinner animation="border" />
  ) : (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={css["modal-title"]}>Notificacao:</Modal.Title>
        </Modal.Header>
        <Modal.Body className={css["modal-body"]}>Erro ao realizar login</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <PageHeader title={state.title} />

        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group controlId="username" as={Col}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.username && !!errors.username}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group controlId="password" as={Col}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" className="justify-content-md-center">
            SignIn
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default SignIn;
