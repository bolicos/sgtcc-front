import React, { useState, useCallback, useEffect } from "react";
import Loader from "#/components/Loader";
import RegisterTeacherComponent from "#/components/RegisterTeacherComponent";
import { DefaultState } from "#/models/default";
import { TitleModel, TeacherModel } from "#/models/sgtcc";
import { GenericModel } from "#/models/props";
import { API } from "#/services/sgtcc";

interface State extends DefaultState {
  titles: TitleModel[];
  teacher: TeacherModel;
}

export const TeacherCreate: React.FC = () => {
  const [state, setState] = useState<State>({
    loading: false,
    title: "Registrar professor",
    titles: [],
    teacher: {} as TeacherModel,
  });

  const columns: GenericModel[] = [
    { title: "Cpf", function: "cpf" },
    { title: "Email", function: "email" },
    { title: "idTitle", function: "idTitle" },
    { title: "Nome", function: "name" },
    { title: "Telefone/celular", function: "phone" },
    { title: "Matricula", function: "registration" },
  ];

  const titleList = useCallback(() => {
    API.TITLE.TITLE_LIST()
      .then((response) => {
        const titles: TitleModel[] = response.data;
        setState((old) => ({ ...old, titles: titles }));
      })
      .catch((exception) => console.log("API error: ", exception))
      .finally(() => setState((old) => ({ ...old, loading: false })));
  }, []);

  useEffect(() => {
    titleList();
  }, [titleList]);

  async function registerTeacher(body: TeacherModel) {
    API.TEACHER.TEACHER_CREATE(body)
      .then(() => setState((old) => ({ ...old })))
      .catch((exception) => console.log("API error: ", exception))
      .finally(() => setState((old) => ({ ...old, loading: false })));
  }

  return state.loading === true ? (
    <Loader />
  ) : (
    <>
      <h1>{state.title}</h1>
      <RegisterTeacherComponent teacher={state.teacher} titles={state.titles} columns={columns} onConfirmRegisterTeacher={registerTeacher} />
    </>
  );
};

export default TeacherCreate;