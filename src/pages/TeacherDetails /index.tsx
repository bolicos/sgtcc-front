import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "#/components/Loader";
import TeacherDetailsComponent from "#/components/TeacherDetailsComponent ";
import { DefaultState } from "#/models/default";
import { TeacherDetailsModel } from "#/models/sgtcc";
import { GenericModel } from "#/models/props";
import { API } from "#/services/sgtcc";

interface State extends DefaultState {
    title: string;
    teacher: TeacherDetailsModel;
}

export const TeacherDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<State>({
        loading: true,
        title: "Detalhes do professor",
        teacher: {} as TeacherDetailsModel,
    });

    const columns: GenericModel[] = [
        { title: "Cpf", function: "cpf" },
        { title: "Created At", function: "createdAt" },
        { title: "Email", function: "email" },
        { title: "id", function: "id" },
        { title: "Name", function: "name" },
        { title: "Phone", function: "phone" },
        { title: "Registration", function: "registration" },
        { title: "Description", function: "title.description" },
        { title: "id", function: "title.id" },
        { title: "Nomenclature", function: "title.nomenclature" },
        { title: "Type", function: "title.type" },
    ];

    const teacherDetails = useCallback(() => {
        API.teacher_details(id)
            .then((response) => {
                const teacher: TeacherDetailsModel = response.data;
                setState((old) => ({ ...old, teacher: teacher }));
            })
            .catch((exception) => console.log("API error: ", exception))
            .finally(() => setState((old) => ({ ...old, loading: false })));
    }, [id]);

    useEffect(() => {
        teacherDetails();
    }, [teacherDetails]);

    return state.loading === true ? (
        <Loader />
    ) : (
        <>
            <h1 >{state.title}</h1>
            <TeacherDetailsComponent teacher={state.teacher} columns={columns} />
        </>
    );
};

export default TeacherDetails;