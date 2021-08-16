import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { EditStudentProps } from "#/models/props";
import { EditStudentModel } from "#/models/sgtcc";
import { ROUTES } from "#/constants";

export const EditStudent: React.FC<EditStudentProps> = ({ student, columns, onConfirmEditStudent, ...props }) => {
    const history = useHistory();

    const { handleBlur, handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            email: student.email,
            phone: student.phone,
        },
        onSubmit: (student: EditStudentModel) => {
            onConfirmEditStudent(student);
        },
    });

    function redirect(route: string) {
        history.push(route);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                required
                id="email"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="phone">Phone</label>
            <input
                required
                id="phone"
                name="phone"
                value={values.phone}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <button onClick={() => redirect(ROUTES.HOME())}>Voltar</button>
            <button type="submit">Editar</button>
        </form>
    );
};

export default EditStudent;
