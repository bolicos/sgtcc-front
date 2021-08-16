import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { RegisterStudentProps } from "#/models/props";
import { StudentModel } from "#/models/sgtcc";
import { ROUTES } from "#/constants";

export const RegisterStudentComponent: React.FC<RegisterStudentProps> = ({ student, columns, onConfirmRegisterStudent, ...props }) => {
    const history = useHistory();

    const { handleBlur, handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            cpf: student.cpf,
            email: student.email,
            name: student.name,
            phone: student.phone,
            registration: student.registration,
        },
        onSubmit: (student: StudentModel) => {
            onConfirmRegisterStudent(student);
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

export default RegisterStudentComponent;