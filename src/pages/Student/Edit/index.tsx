import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditStudentComponent from "#/components/EditStudentComponent";
import { DefaultState } from "#/models/default";
import { EditStudentModel, StudentDetailsModel } from "#/models/sgtcc";
import { GenericModel } from "#/models/props";
import { API } from "#/services/sgtcc";
import { Spinner } from "react-bootstrap";

interface State extends DefaultState {
    student: EditStudentModel;
}

export const StudentEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<State>({
        loading: true,
        title: "Editar estudante",
        student: {} as EditStudentModel,
    });

    const columns: GenericModel[] = [
        { title: "Email", function: "email" },
        { title: "Phone", function: "phone" },
    ];

    const studentDetails = useCallback(() => {
        API.STUDENT.STUDENT_DETAILS(id)
            .then((response) => {
                const student: StudentDetailsModel = response.data;
                setState((old) => ({ ...old, student: student }));
            })
            .catch((exception) => console.log("API error: ", exception))
            .finally(() => setState((old) => ({ ...old, loading: false })));
    }, [id]);

    useEffect(() => {
        studentDetails();
    }, [studentDetails]);

    const editStudent = useCallback((body: EditStudentModel) => {
        API.STUDENT.STUDENT_EDIT(id, body)
            .then(() => {
                setState((old) => ({ ...old }));
            })
            .catch((exception) => console.log("API error: ", exception))
            .finally(() => setState((old) => ({ ...old, loading: false })));
    }, [id]);

    return state.loading === true ? (
        <Spinner animation="grow" />
    ) : (
        <>
            <h1>{state.title}</h1>
            <EditStudentComponent student={state.student} columns={columns} onConfirmEditStudent={editStudent} />
        </>
    );
};

export default StudentEdit;
