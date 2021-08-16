import React from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { TeacherDetailsProps } from "#/models/props";
import { ROUTES } from "#/constants";
import stylesheet from "./stylesheet.module.scss";

export const TeacherDetails: React.FC<TeacherDetailsProps> = ({ teacher, columns, ...props }) => {
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
                <td>{teacher.cpf}</td>
                <td>{teacher.createdAt}</td>
                <td>{teacher.email}</td>
                <td>{teacher.name}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.registration}</td>
                <td>{teacher.title.description}</td>
                <td>{teacher.title.nomenclature}</td>
                <td>{teacher.title.type}</td>
            </tr>
            <button onClick={() => redirect(ROUTES.HOME())}>Voltar</button>
        </div>
    );
};

export default TeacherDetails;