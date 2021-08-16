import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { EditTeacherProps } from "#/models/props";
import { EditTeacherModel } from "#/models/sgtcc";
import { ROUTES } from "#/constants";

export const EditTeacher: React.FC<EditTeacherProps> = ({ titles, teacher, columns, onConfirmEditTeacher, ...props }) => {
    const history = useHistory();

    const { handleBlur, handleSubmit, handleChange, setFieldValue, values } = useFormik({
        initialValues: {
            email: teacher.email,
            phone: teacher.phone,
            title: {
                description: teacher.title.description,
                id: teacher.title.id,
                nomenclature: teacher.title.nomenclature,
                type: teacher.title.type,
            },
        },
        onSubmit: (teacher: EditTeacherModel) => {
            onConfirmEditTeacher(teacher);
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
            <label htmlFor="title.id">Títulos</label>
            <select
                required
                id="title.id"
                name="title.id"
                value={values.title.id}
                onBlur={handleBlur}
                onChange={(event) => setFieldValue("title.id", event)}
            >
                {titles.map((item: any) => (
                    <option value={item.description}>{item.id}</option>
                ))}
            </select>
            <button onClick={() => redirect(ROUTES.HOME())}>Voltar</button>
            <button type="submit">Editar</button>
        </form>
    );
};

export default EditTeacher;
