import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "#/components/Loader";
import EditTeacherComponent from "#/components/EditTeacherComponent";
import { DefaultState } from "#/models/default";
import { TitleModel, EditTeacherModel, TeacherDetailsModel } from "#/models/sgtcc";
import { GenericModel } from "#/models/props";
import { API } from "#/services/sgtcc";

interface State extends DefaultState {
    titles: TitleModel[];
    teacher: EditTeacherModel;
}

export const TeacherEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<State>({
        loading: true,
        title: "Editar professor",
        titles: [],
        teacher: {} as EditTeacherModel,
    });

    const columns: GenericModel[] = [
        { title: "Email", function: "email" },
        { title: "Phone", function: "phone" },
        { title: "Description", function: "title.description" },
        { title: "id", function: "title.id" },
        { title: "Nomenclature", function: "title.nomenclature" },
        { title: "Type", function: "title.type" },
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

    const teacherDetails = useCallback(() => {
        API.TEACHER.TEACHER_DETAILS(id)
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

    const editTeacher = useCallback((body: EditTeacherModel) => {
        API.TEACHER.TEACHER_EDIT(id, body)
            .then(() => {
                setState((old) => ({ ...old }));
            })
            .catch((exception) => console.log("API error: ", exception))
            .finally(() => setState((old) => ({ ...old, loading: false })));
    }, [id]);

    return state.loading === true ? (
        <Loader />
    ) : (
        <>
            <h1>{state.title}</h1>
            <EditTeacherComponent teacher={state.teacher} titles={state.titles} columns={columns} onConfirmEditTeacher={editTeacher} />
        </>
    );
};

export default TeacherEdit;
