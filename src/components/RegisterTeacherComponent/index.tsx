import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { RegisterTeacherProps } from "#/models/props";
import { TeacherModel } from "#/models/sgtcc";
import { ROUTES } from "#/constants";

export const RegisterTeacherComponent: React.FC<RegisterTeacherProps> = ({ titles, teacher, columns, onConfirmRegisterTeacher, ...props }) => {
    const history = useHistory();

    const { handleBlur, handleSubmit, handleChange, values, setFieldValue } = useFormik({
        initialValues: {
            cpf: teacher.cpf,
            email: teacher.email,
            idTitle: teacher.idTitle,
            name: teacher.name,
            phone: teacher.phone,
            registration: teacher.registration,
        },
        onSubmit: (teacher: TeacherModel) => {
            onConfirmRegisterTeacher(teacher);
        },
    });

    function redirect(route: string) {
        history.push(route);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="cpf">Cpf</label>
            <input
                required
                id="cpf"
                name="cpf"
                value={values.cpf}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
                required
                id="email"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="idTitle">Títulos</label>
            <select
                required
                id="idTitle"
                name="idTitle"
                value={values.idTitle}
                onBlur={handleBlur}
                onChange={(event) => setFieldValue("idTitle", event)}
            >
                {titles.map((item: any) => (
                    <option value={item.description}>{item.id}</option>
                ))}
            </select>
            <label htmlFor="name">Nome</label>
            <input
                required
                id="name"
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="phone">Telefone/celular</label>
            <input
                required
                id="phone"
                name="phone"
                value={values.phone}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="registration">Matricula</label>
            <input
                required
                id="registration"
                name="registration"
                value={values.registration}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <button onClick={() => redirect(ROUTES.HOME())}>Voltar</button>
            <button type="submit">Registrar</button>
        </form >
    );
};

export default RegisterTeacherComponent;