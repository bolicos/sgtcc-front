import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "#/components/Loader";
import ProposalDetailsComponent from "#/components/ProposalDetailsComponent";
import { DefaultState } from "#/models/default";
import { ProposalDetailsModel } from "#/models/sgtcc";
import { GenericModel } from "#/models/props";
import { API } from "#/services/sgtcc";

interface State extends DefaultState {
    title: string;
    proposal: ProposalDetailsModel;
}

export const ProposalDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<State>({
        loading: true,
        title: "Detalhes da proposta",
        proposal: {} as ProposalDetailsModel,
    });

    const columns: GenericModel[] = [
        { title: "Cpf", function: "author.cpf" },
        { title: "Created At", function: "author.createdAt" },
        { title: "Email", function: "author.email" },
        { title: "id", function: "author.id" },
        { title: "Name", function: "author.name" },
        { title: "Phone", function: "author.phone" },
        { title: "Registration", function: "author.registration" },
        { title: "createdAt", function: "createdAt" },
        { title: "id", function: "id" },
        { title: "cpf", function: "leader.cpf" },
        { title: "createdAt", function: "leader.createdAt" },
        { title: "email", function: "leader.email" },
        { title: "id", function: "leader.id" },
        { title: "name", function: "leader.name" },
        { title: "phone", function: "leader.phone" },
        { title: "registration", function: "leader.registration" },
        { title: "description", function: "leader.title.description" },
        { title: "id", function: "leader.title.id" },
        { title: "nomenclature", function: "leader.title.nomenclature" },
        { title: "type", function: "leader.title.type" },
        { title: "title", function: "title" },
    ];

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

    return state.loading === true ? (
        <Loader />
    ) : (
        <>
            <h1 >{state.title}</h1>
            <ProposalDetailsComponent proposal={state.proposal} columns={columns} />
        </>
    );
};

export default ProposalDetails;