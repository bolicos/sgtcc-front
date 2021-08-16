import React from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { ProposalDetailsProps } from "#/models/props";
import { ROUTES } from "#/constants";
import stylesheet from "./stylesheet.module.scss";

export const ProposalDetails: React.FC<ProposalDetailsProps> = ({ proposal, columns, ...props }) => {
    const history = useHistory();

    function redirect(route: string) {
        history.push(route);
    }

    return (
        <div className={clsx(stylesheet["div"])}>
            <tr>
                {columns.map((column) => (
                    <th>{column.title}</th>
                ))}
            </tr>
            <tr>
                <td>{proposal.author.cpf}</td>
                <td>{proposal.author.createdAt}</td>
                <td>{proposal.author.email}</td>
                <td>{proposal.author.name}</td>
                <td>{proposal.author.phone}</td>
                <td>{proposal.author.registration}</td>
                <td>{proposal.title.description}</td>
                <td>{proposal.title.nomenclature}</td>
                <td>{proposal.title.type}</td>
                <td>{proposal.createdAt}</td>
                <td>{proposal.leader.cpf}</td>
                <td>{proposal.leader.createdAt}</td>
                <td>{proposal.leader.email}</td>
                <td>{proposal.leader.name}</td>
                <td>{proposal.leader.phone}</td>
                <td>{proposal.leader.registration}</td>
                <td>{proposal.leader.title.description}</td>
                <td>{proposal.leader.title.nomenclature}</td>
                <td>{proposal.leader.title.type}</td>
                <td>{proposal.title}</td>
            </tr>
            <button onClick={() => redirect(ROUTES.HOME())}>Voltar</button>
        </div>
    );
};

export default ProposalDetails;