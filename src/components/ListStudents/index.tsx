import React from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { ListStudentsProps } from "#/models/props";
import { ROUTES } from "#/constants";
import stylesheet from "./stylesheet.module.scss";
import StudentDetails from "../StudentDetailsComponent";

export const ListStudents: React.FC<ListStudentsProps> = ({ students, columns, ...props }) => {
    const history = useHistory();

    function redirect(route: string) {
        history.push(route);
    }

    return (
      <div className={clsx(stylesheet["div"])}>
        <h1>teste</h1>
        <tr>
          {columns.map((column) => (
            <th>{column.title}</th>
          ))}
        </tr>
        <tr>
          {/* {students.map((student) => (
            <StudentDetails student={student}/>
          ))} */}
        </tr>
        <button onClick={() => redirect(ROUTES.HOME())}>Voltar</button>
      </div>
    );
};

export default ListStudents;
