// importa os hooks de useEffect, useState, useCallback
import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// importa os componentes estilizados do react bootstrap
import { Row, Col, Container, Button, Form, Spinner, Modal } from "react-bootstrap";
// importa o componente de pageheader
import PageHeader from "#/components/PageHeader";
// importa as rotas da aplicacao
import { ROUTES } from "#/constants";
import { API } from "#/services/sgtcc";
// importa a model de student e teacher da aplicacao de sgtcc
import { StudentDetailsModel, TeacherDetailsModel } from "#/models/sgtcc";
import { ProposalRequest } from "#/models/request/proposal";
import { ResourceCreate } from "#/models/resource/created";
import { DefaultState } from "#/models/default";
//importa o arquivo de estilos especifico da pagina
import css from "./styles.module.scss";

//inicializa as variaveis de students e teachers como array da model de students e teachers details
interface State extends DefaultState {
  students: Array<StudentDetailsModel>;
  teachers: Array<TeacherDetailsModel>;
}

export const ProposalCreate: React.FC = () => {
  const [show, setShow] = useState(false);
  //inicializa as variaveis de estado
  const [state, setState] = useState<State>({
    loading: true,
    title: "Criar Proposta",
    students: [],
    teachers: [],
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // adiciona validacoes de obrigatoriedade para os atributos de author, orientador e titulo
  const validationSchema = Yup.object().shape({
    author: Yup.number().moreThan(0, "Autor obrigatorio."),
    leader: Yup.number().moreThan(0, "Orientador obrigatorio."),
    title: Yup.string().required("Titulo obrigatorio."),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik<ProposalRequest>({
    initialValues: {
      author: 0,
      leader: 0,
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit() {
      sendProposal();
    },
  });
//faz a request para receber a lista de estudantes
  const fetchStudents = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    API.STUDENT.STUDENT_LIST()
      .then((response) => {
        //se deu certo, retorna a lista
        const students: Array<StudentDetailsModel> = response.data;
        setState((prev) => ({ ...prev, students: students }));
      })
      .catch((exception) => {
        //se algo deu errado retorna o log e gera uma exception
        console.log("Algo deu errado, erro: ", exception);
        throw new Error(exception.message);
      })
      .finally(() => {
        setState((prev) => ({ ...prev, loading: false }));
      });
  }, []);
//faz a request para receber a lista de professores
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
//faz a request para criar a proposta
  const sendProposal = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true }));
    API.PROPOSAL.PROPOSAL_CREATE(values)
      .then((response) => {
        const resourceCreated: ResourceCreate = response.data;
        handleShow();
        //se deu certo retorna o log com o recurso criado
        console.log("resourceCreated: ", resourceCreated);
      })
      .catch((exception) => {
        //se algo deu errado retorna o log e gera uma exception
        console.log("Algo deu errado, erro: ", exception);
        throw new Error(exception.message);
      })
      .finally(() => {
        resetForm();
        setState((prev) => ({ ...prev, loading: false }));
      });
  }, [values, resetForm]);

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, [fetchStudents, fetchTeachers]);
  // adiciona um spinner enquanto aguarda o carregamento da tela
  return state.loading === true ? (
    <Spinner animation="grow" />
  ) : (
    // renderiza um modal para notificar que a proposta foi criada com sucesso
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={css["modal-title"]}>Notificacao:</Modal.Title>
        </Modal.Header>
        <Modal.Body className={css["modal-body"]}>Proposta salvo com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <PageHeader title={state.title} />

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="proposal.title">
          {/* adiciona o campo de titilo e chama as funcções de validação quando alterar e desfocar do campo */}
            <Form.Label>Titulo:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Digite o titulo da Proposta"
              isInvalid={touched.title && !!errors.title}
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="proposal.author">
            {/* adiciona o campo de autor e chama as funções de validação quando alterar e desfocar do campo */}
            <Form.Label> Selecione o Autor:</Form.Label>
            <Form.Control
              as="select"
              name="author"
              value={values.author}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.author && !!errors.author}>
              <option key="0" value="0">
                Selecione um autor
              </option>
              {/* mostra no select os valores que vieram na requisicao de fetch students */}
              {state.students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="proposal.leader">
            {/* adiciona o campo de autor e chama as funções de validação quando alterar e desfocar do campo */}
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
              {/* mostra no select os valores que vieram na requisicao de fetch teachers */}
              {state.teachers?.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.leader}</Form.Control.Feedback>
          </Form.Group>

          <Row className="justify-content-md-center">
            <Col sm={2}>
              {/* ao clicar em cancelar é redirecionado para a home */}
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

export default ProposalCreate;
