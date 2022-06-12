import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "#/components/Loader";
import { StudentDetailsModel } from "#/models/sgtcc";
import { GenericModel } from "#/models/props";
import { API } from "#/services/sgtcc";

interface State {
  loading: boolean;
  title: string;
  students: Array<StudentDetailsModel>;
}

export const ListStudents: React.FC = () => {
  const [state, setState] = useState<State>({
    loading: true,
    title: "Listar Alunos",
    students: [],
  });
  
  const fetchStudents = useCallback(async () => {
  API.student_list()
    .then((response) => {
      const students: Array<StudentDetailsModel> = response.data;
      setState((prev) => ({ ...prev, students: students }));
    })
    .catch((exception) => {
      console.log("Algo deu errado, erro: ", exception);
      throw new Error(exception.message);
    })
    .finally(() => {
      setState((prev) => ({ ...prev, loading: false }));
    });
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return state.loading === true ? (
    <Loader />
  ) : (
    <>
      <h1 >{state.title}</h1>
      <ListStudents students={state.students} />
    </>
  );
};

export default ListStudents;
