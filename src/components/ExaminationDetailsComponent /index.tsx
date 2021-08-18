import React from "react";
import { useHistory } from "react-router-dom";
import { ExaminationDetailsProps } from "#/models/props";
import { ROUTES } from "#/constants";

export const ExaminationDetails: React.FC<ExaminationDetailsProps> = ({ examination, columns, ...props }) => {
    const history = useHistory();

    function redirect(route: string) {
        history.push(route);
    }

    return (
        <div >
            <tr>
                {columns.map((column) => (
                    <th>{column.title}</th>
                ))}
            </tr>
            <tr>
                <td>{examination.approved}</td>
                <td>{examination.createdAt}</td>
                <td>{examination.id}</td>
                <td>{examination.language}</td>
                <td>{examination.note}</td>
                <td>{examination.observation}</td>
                <td>{examination.presentation}</td>
                <td>{examination.proposal.author.cpf}</td>
                <td>{examination.proposal.author.createdAt}</td>
                <td>{examination.proposal.author.email}</td>
                <td>{examination.proposal.author.id}</td>
                <td>{examination.proposal.author.name}</td>
                <td>{examination.proposal.author.phone}</td>
                <td>{examination.proposal.author.registration}</td>
                <td>{examination.proposal.createdAt}</td>
                <td>{examination.proposal.id}</td>
                <td>{examination.proposal.leader.cpf}</td>
                <td>{examination.proposal.leader.createdAt}</td>
                <td>{examination.proposal.leader.email}</td>
                <td>{examination.proposal.leader.id}</td>
                <td>{examination.proposal.leader.name}</td>
                <td>{examination.proposal.leader.phone}</td>
                <td>{examination.proposal.leader.registration}</td>
                <td>{examination.proposal.leader.title.description}</td>
                <td>{examination.proposal.leader.title.id}</td>
                <td>{examination.proposal.leader.title.nomenclature}</td>
                <td>{examination.proposal.leader.title.type}</td>
                <td>{examination.proposal.title}</td>
                <td>{examination.relevance}</td>
                <td>{examination.proposal.teacher.cpf}</td>
                <td>{examination.proposal.teacher.createdAt}</td>
                <td>{examination.proposal.teacher.email}</td>
                <td>{examination.proposal.teacher.id}</td>
                <td>{examination.proposal.teacher.name}</td>
                <td>{examination.proposal.teacher.phone}</td>
                <td>{examination.proposal.teacher.registration}</td>
                <td>{examination.proposal.teacher.title.description}</td>
                <td>{examination.proposal.teacher.title.id}</td>
                <td>{examination.proposal.teacher.title.nomenclature}</td>
                <td>{examination.proposal.teacher.title.type}</td>
                <td>{examination.proposal.textContent}</td>
                <td>{examination.proposal.textStructure}</td>
                <td>{examination.proposal.title}</td>
                <td>{examination.proposal.type}</td>
            </tr>
            <button onClick={() => redirect(ROUTES.HOME())}>Voltar</button>
        </div>
    );
};

export default ExaminationDetails;