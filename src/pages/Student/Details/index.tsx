import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentDetailsComponent from "#/components/StudentDetailsComponent";
import { DefaultState } from "#/models/default";
import { StudentDetailsModel } from "#/models/sgtcc";
import { GenericModel } from "#/models/props";
import { API } from "#/services/sgtcc";
import { Spinner } from "react-bootstrap";

interface State extends DefaultState {
    student: StudentDetailsModel;
}

export const StudentDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<State>({
        loading: true,
        title: "Detalhes do aluno",
        student: {} as StudentDetailsModel,
    });

    const columns: GenericModel[] = [
        { title: "Cpf", function: "cpf" },
        { title: "Created At", function: "createdAt" },
        { title: "Email", function: "email" },
        { title: "id", function: "id" },
        { title: "Name", function: "name" },
        { title: "Phone", function: "phone" },
        { title: "Registration", function: "registration" },
    ];

    const studentDetails = useCallback(() => {
        API.STUDENT.STUDENT_DETAILS(id)
            .then((response) => {
                const student: StudentDetailsModel = response.data;
                setState((old) => ({ ...old, student: student }));
            })
            .catch((exception) => console.log("API error: ", exception))
            .finally(() => setState((old) => ({ ...old, pending: false })));
    }, [id]);

    useEffect(() => {
        studentDetails();
    }, [studentDetails]);

    return state.loading === true ? (
        <Spinner animation="grow" />
    ) : (
        <>
            <h1 >{state.title}</h1>
            <StudentDetailsComponent student={state.student} columns={columns} />
        </>
    );
};

export default StudentDetails;