import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Col, Row, Container, Spinner, Modal } from "react-bootstrap";
// importa o formik para utilizar helpers de formulario
import { useFormik } from "formik";
import * as Yup from "yup";
import { User } from "#/models/user";
// importa a api de autenticacao
import { API } from "#/services/auth";
import PageHeader from "#/components/PageHeader";
// importa o arquivo de estilos da pagina
import css from "./styles.module.scss";
import { DefaultState } from "#/models/default";
import { JwtToken } from "#/models/response/user";
import { SignInProps } from "#/models/props/auth";
import { ROUTES } from "#/constants";
// importa helpers de autenticacao
import { AUTH } from "#/helpers/Auth";

//inicializa as variaveis de roken e o helper de isAuthenticated
interface State extends DefaultState {
  isAuthenticated: boolean;
  token: string;
}

export const SignIn: React.FC<SignInProps> = ({ success }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  // inicializa as variaveis de estado 
  const [state, setState] = useState<State>({
    loading: true,
    title: "SignIn",
    isAuthenticated: false,
    token: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const schema = Yup.object().shape({
    username: Yup.string().required("Preencha o campo para continuar."),
    password: Yup.string().required("Preencha o campo para continuar."),
  });

  // adiciona os helpers de formulario do formik e seta os valores iniciais dos campos
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
  // define a chamada de signin para a api de autenticação
  // recebe como resposta o jwntoken
  const signIn = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true }));
    API.AUTH.SIGN_IN(values)
      .then((response) => {
        const token: JwtToken = response.data;

        setState((prev) => ({
          ...prev,
          token: token.jwt,
        }));
      })
      .catch((exception) => {
        handleShow();
        console.log("Algo deu errado, erro: ", exception);
      })
      .finally(() => {
        setState((prev) => ({ ...prev, loading: false }));
      });
  }, [values]);

  //verifica se o token existe e é válido
  const afterSignIn = useCallback(() => {
    if (!!state.token && AUTH.IS_VALID(state.token)) {
      AUTH.SIGNIN(state.token);
    }

    setState((prev) => ({ ...prev, isAuthenticated: AUTH.IS_VALID(state.token) }));
  }, [state.token]);

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: false }));
  }, []);

  useEffect(() => {
    afterSignIn();
  }, [afterSignIn]);

  useEffect(() => {
    if (state.isAuthenticated) {
      // verifica se o usuario esta autenticado e se estiver, redireciona para a dashboard
      history.push(ROUTES.DASHBOARD());
    }
  }, [history, state.isAuthenticated]);
  //adiciona um spinner durante o carregamento da pagina
  return state.loading === true ? (
    <Spinner animation="border" />
  ) : (
    <>
    {/* adiciona um modal de notificação no caso de erro no login */}
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
        {/* adiciona o componente de PageHeader passando o titulo como parametro */}
        <PageHeader title={state.title} />

        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group controlId="username" as={Col}>
              {/* adiciona o input de username, chama funcoes de tratamento de formulario em branco e invalido */}
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
                {/* mostra os erros no campo de username */}
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group controlId="password" as={Col}>
              {/* adiciona o input de password, chama funcoes de tratamento de formulario em branco e invalido */}
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
                {/* mostra os erros no campo de password */}
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
