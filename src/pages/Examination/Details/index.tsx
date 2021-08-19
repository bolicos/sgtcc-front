import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import ExaminationDetailsComponent from "#/components/ExaminationDetailsComponent ";
import { DefaultState } from "#/models/default";
import { ExaminationDetailsModel } from "#/models/sgtcc";
import { GenericModel } from "#/models/props";
import { API } from "#/services/sgtcc";

interface State extends DefaultState {
    examination: ExaminationDetailsModel;
}

export const ExaminationDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<State>({
        loading: true,
        title: "Detalhes da avaliação",
        examination: {} as ExaminationDetailsModel,
    });

    const columns: GenericModel[] = [
        { title: "Approved", function: "approved" },
        { title: "Created At", function: "createdAt" },
        { title: "id", function: "id" },
        { title: "Language", function: "language" },
        { title: "Note", function: "note" },
        { title: "Observation", function: "observation" },
        { title: "Presentation", function: "presentation" },
        { title: "Proposal Author cpf", function: "proposal.author.cpf" },
        { title: "Proposal Author createdAt", function: "proposal.author.createdAt" },
        { title: "Proposal Author email", function: "proposal.author.email" },
        { title: "Proposal Author id", function: "proposal.author.id" },
        { title: "Proposal Author name", function: "proposal.author.name" },
        { title: "Proposal Author phone", function: "proposal.author.phone" },
        { title: "Proposal Author registration", function: "proposal.author.registration" },
        { title: "Proposal createdAt", function: "proposal.createdAt" },
        { title: "Proposal id", function: "proposal.id" },
        { title: "Proposal leader cpf", function: "proposal.leader.cpf" },
        { title: "Proposal leader createdAt", function: "proposal.leader.createdAt" },
        { title: "Proposal leader email", function: "proposal.leader.email" },
        { title: "Proposal leader id", function: "proposal.leader.id" },
        { title: "Proposal leader name", function: "proposal.leader.name" },
        { title: "Proposal leader phone", function: "proposal.leader.phone" },
        { title: "Proposal leader registration", function: "proposal.leader.registration" },
        { title: "Proposal leader title description", function: "proposal.leader.title.description" },
        { title: "Proposal leader title id", function: "proposal.leader.title.id" },
        { title: "Proposal leader title nomenclature", function: "proposal.leader.title.nomenclature" },
        { title: "Proposal leader title type", function: "proposal.leader.title.type" },
        { title: "Proposal title", function: "proposal.title" },
        { title: "relevance", function: "relevance" },
        { title: "Proposal teacher cpf", function: "proposal.teacher.cpf" },
        { title: "Proposal teacher createdAt", function: "proposal.teacher.createdAt" },
        { title: "Proposal teacher email", function: "proposal.teacher.email" },
        { title: "Proposal teacher id", function: "proposal.teacher.id" },
        { title: "Proposal teacher name", function: "proposal.teacher.name" },
        { title: "Proposal teacher phone", function: "proposal.teacher.phone" },
        { title: "Proposal teacher registration", function: "proposal.teacher.registration" },
        { title: "Proposal teacher title description", function: "proposal.teacher.title.description" },
        { title: "Proposal teacher title id", function: "proposal.teacher.title.id" },
        { title: "Proposal teacher title nomenclature", function: "proposal.teacher.title.nomenclature" },
        { title: "Proposal teacher title type", function: "proposal.teacher.title.type" },
        { title: "Proposal textContent", function: "proposal.textContent" },
        { title: "Proposal textStructure", function: "proposal.textStructure" },
        { title: "Proposal title", function: "proposal.title" },
        { title: "Proposal type", function: "proposal.type" },
    ];

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

    return state.loading === true ? (
        <Spinner animation="grow" />
    ) : (
        <>
            <h1 >{state.title}</h1>
            <ExaminationDetailsComponent examination={state.examination} columns={columns} />
        </>
    );
};

export default ExaminationDetails;