import React, { useState } from "react";
import Loader from "#/components/Loader";
import RegisterStudentComponent from "#/components/RegisterStudentComponent";
import { DefaultState } from "#/models/default";
import { StudentModel } from "#/models/sgtcc";
import { GenericModel } from "#/models/props";
import { API } from "#/services/sgtcc";

interface State extends DefaultState {
  student: StudentModel;
}

export const RegisterStudent: React.FC = () => {
  const [state, setState] = useState<State>({
    loading: false,
    title: "Registrar aluno",
    student: {} as StudentModel,
  });

  const columns: GenericModel[] = [
    { title: "Cpf", function: "cpf" },
    { title: "Email", function: "email" },
    { title: "Nome", function: "name" },
    { title: "Telefone/celular", function: "phone" },
    { title: "Matricula", function: "registration" },
  ];

  async function registerStudent(body: StudentModel) {
    API.STUDENT.STUDENT_CREATE(body)
      .then(() => setState((old) => ({ ...old })))
      .catch((exception) => console.log("API error: ", exception))
      .finally(() => setState((old) => ({ ...old, loading: false })));
  }

  return state.loading === true ? (
    <Loader />
  ) : (
    <>
      <h1>{state.title}</h1>
      <RegisterStudentComponent student={state.student} columns={columns} onConfirmRegisterStudent={registerStudent} />
    </>
  );
};

export default RegisterStudent;