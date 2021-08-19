import React, { useState, useCallback, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import RegisterExaminationComponent from "#/components/RegisterExaminationComponent";
import { DefaultState } from "#/models/default";
import { ProposalDetailsModel, TeacherDetailsModel, Type, ExaminationModel } from "#/models/sgtcc";
import { GenericModel } from "#/models/props";
import { API } from "#/services/sgtcc";

interface State extends DefaultState {
  proposals: ProposalDetailsModel[];
  teachers: TeacherDetailsModel[];
  types: Type[];
  examination: ExaminationModel;
}

export const ExaminationCreate: React.FC = () => {
  const [state, setState] = useState<State>({
    loading: false,
    title: "Registrar avaliação",
    proposals: [],
    teachers: [],
    types: [],
    examination: {} as ExaminationModel,
  });

  const columns: GenericModel[] = [
    { title: "Aprovado", function: "approved" },
    { title: "Linguagem", function: "language" },
    { title: "Nota", function: "note" },
    { title: "Observação", function: "observation" }, //textarea
    { title: "Apresentação", function: "presentation" },
    { title: "Proposta", function: "proposal" }, //select
    { title: "Relevância", function: "relevance" },
    { title: "Professor", function: "teacher" }, //select
    { title: "Conteúdo do texto", function: "textContent" },
    { title: "Estrutura do texto", function: "textStructure" },
    { title: "Titulo", function: "title" },
    { title: "Tipo", function: "type" }, //select
  ];

  const proposalList = useCallback(() => {
    API.PROPOSAL.PROPOSAL_LIST()
      .then((response) => {
        const proposals: ProposalDetailsModel[] = response.data;
        setState((old) => ({ ...old, proposals: proposals }));
      })
      .catch((exception) => console.log("API error: ", exception))
      .finally(() => setState((old) => ({ ...old, loading: false })));
  }, []);

  useEffect(() => {
    proposalList();
  }, [proposalList]);

  const teacherList = useCallback(() => {
    API.TEACHER.TEACHER_LIST()
      .then((response) => {
        const teachers: TeacherDetailsModel[] = response.data;
        setState((old) => ({ ...old, teachers: teachers }));
      })
      .catch((exception) => console.log("API error: ", exception))
      .finally(() => setState((old) => ({ ...old, loading: false })));
  }, []);

  useEffect(() => {
    teacherList();
  }, [teacherList]);

  const typeList = useCallback(() => {
    API.TYPE.TYPE_LIST()
      .then((response) => {
        const types: Type[] = response.data;
        setState((old) => ({ ...old, types: types }));
      })
      .catch((exception) => console.log("API error: ", exception))
      .finally(() => setState((old) => ({ ...old, loading: false })));
  }, []);

  useEffect(() => {
    typeList();
  }, [typeList]);

  async function registerExamination(body: ExaminationModel) {
    API.EXAMINATION.EXAMINATION_CREATE(body)
      .then(() => setState((old) => ({ ...old })))
      .catch((exception) => console.log("API error: ", exception))
      .finally(() => setState((old) => ({ ...old, loading: false })));
  }

  return state.loading === true ? (
    <Spinner animation="grow" />
  ) : (
    <>
      <h1>{state.title}</h1>
      <RegisterExaminationComponent examination={state.examination} proposals={state.proposals} teachers={state.teachers} types={state.types} columns={columns} onConfirmRegisterExamination={registerExamination} />
    </>
  );
};

export default ExaminationCreate;