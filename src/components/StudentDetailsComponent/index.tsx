import React from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { StudentDetailsProps } from "#/models/props";
import { ROUTES } from "#/constants";
import stylesheet from "./stylesheet.module.scss";

export const StudentDetails: React.FC<StudentDetailsProps> = ({ student, columns, ...props }) => {
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
                <td>{student.cpf}</td>
                <td>{student.createdAt}</td>
                <td>{student.email}</td>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>{student.registration}</td>
            </tr>
            <button onClick={() => redirect(ROUTES.HOME())}>Voltar</button>
        </div>
    );
};

export default StudentDetails;