import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "#/components/Loader";
import EditExaminationComponent from "#/components/EditExaminationComponent";
import { DefaultState } from "#/models/default";
import { Type, EditExaminationModel, ExaminationDetailsModel } from "#/models/sgtcc";
import { GenericModel } from "#/models/props";
import { API } from "#/services/sgtcc";

interface State extends DefaultState {
    types: Type[];
    examination: EditExaminationModel;
}

export const ExaminationEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<State>({
        loading: true,
        title: "Editar avaliação",
        types: [],
        examination: {} as EditExaminationModel,
    });

    const columns: GenericModel[] = [
        { title: "Approved", function: "approved" },
        { title: "Language", function: "language" },
        { title: "Note", function: "note" },
        { title: "observation", function: "observation" },
        { title: "presentation", function: "presentation" },
        { title: "relevance", function: "relevance" },
        { title: "textContent", function: "textContent" },
        { title: "textStructure", function: "textStructure" },
        { title: "title", function: "title" },
        { title: "Type", function: "type" },
    ];

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

    const examinationDetails = useCallback(() => {
        API.EXAMINATION.EXAMINATION_DETAILS(id)
            .then((response) => {
                const examination: ExaminationDetailsModel = response.data;
                setState((old) => ({ ...old, examination: examination }));
            })
            .catch((exception) => console.log("API error: ", exception))
            .finally(() => setState((old) => ({ ...old, loading: false })));
    }, [id]);

    useEffect(() => {
        examinationDetails();
    }, [examinationDetails]);

    const editExamination = useCallback((body: EditExaminationModel) => {
        API.EXAMINATION.EXAMINATION_EDIT(id, body)
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
            <EditExaminationComponent examination={state.examination} types={state.types} columns={columns} onConfirmEditExamination={editExamination} />
        </>
    );
};

export default ExaminationEdit;
