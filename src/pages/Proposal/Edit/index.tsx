import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "#/components/Loader";
import EditProposalComponent from "#/components/EditProposalComponent";
import { DefaultState } from "#/models/default";
import { TeacherDetailsModel, EditProposalModel, ProposalDetailsModel } from "#/models/sgtcc";
import { GenericModel } from "#/models/props";
import { API } from "#/services/sgtcc";

interface State extends DefaultState {
    title: string;
    teachers: TeacherDetailsModel[];
    proposal: EditProposalModel;
}

export const EditProposal: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<State>({
        loading: true,
        title: "Editar proposta",
        teachers: [],
        proposal: {} as EditProposalModel,
    });

    const columns: GenericModel[] = [
        { title: "Cpf", function: "author.cpf" },
        { title: "CreatedAt", function: "author.createdAt" },
        { title: "Email", function: "author.email" },
        { title: "id", function: "author.id" },
        { title: "Name", function: "author.name" },
        { title: "Phone", function: "author.phone" },
        { title: "Registration", function: "author.registration" },
    ];

    const teacherList = useCallback(() => {
        API.teacher_list()
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

    const proposalDetails = useCallback(() => {
        API.proposal_details(id)
            .then((response) => {
                const proposal: ProposalDetailsModel = response.data;
                setState((old) => ({ ...old, proposal: proposal }));
            })
            .catch((exception) => console.log("API error: ", exception))
            .finally(() => setState((old) => ({ ...old, loading: false })));
    }, [id]);

    useEffect(() => {
        proposalDetails();
    }, [proposalDetails]);

    const editProposal = useCallback((body: EditProposalModel) => {
        API.edit_proposal(id, body)
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
            <EditProposalComponent proposal={state.proposal} teachers={state.teachers} columns={columns} onConfirmEditProposal={editProposal} />
        </>
    );
};

export default EditProposal;
