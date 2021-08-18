import React from "react";
import { Field, useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { RegisterExaminationProps } from "#/models/props";
import { ExaminationModel } from "#/models/sgtcc";
import { ROUTES } from "#/constants";

export const RegisterExaminationComponent: React.FC<RegisterExaminationProps> = ({ proposals, teachers, types, examination, columns, onConfirmRegisterExamination, ...props }) => {
    const history = useHistory();

    const { handleBlur, handleSubmit, handleChange, values, setFieldValue } = useFormik({
        initialValues: {
            approved: examination.approved,
            language: examination.language,
            note: examination.note,
            observation: examination.observation,
            presentation: examination.presentation,
            proposal: examination.proposal,
            relevance: examination.relevance,
            teacher: examination.teacher,
            textContent: examination.textContent,
            textStructure: examination.textStructure,
            title: examination.title,
            type: examination.type,
        },
        onSubmit: (examination: ExaminationModel) => {
            onConfirmRegisterExamination(examination);
        },
    });

    function redirect(route: string) {
        history.push(route);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div id="checkbox-group">Approved</div>
            <div role="group" aria-labelledby="checkbox-group">
                <label>
                    <Field type="checkbox" name="approved" value={values.approved} onBlur={handleBlur} onChange={(event: any) => setFieldValue("approved", event)} />
                    yes
                </label>
                <label>
                    <Field type="checkbox" name="checked" value={values.approved} onBlur={handleBlur} onChange={(event: any) => setFieldValue("approved", event)} />
                    not
                </label>
            </div>
            <label htmlFor="language">Language</label>
            <input
                required
                id="language"
                name="language"
                value={values.language}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="note">Note</label>
            <input
                required
                id="note"
                name="note"
                value={values.note}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="observation">Observation</label>
            <input
                required
                id="observation"
                name="observation"
                value={values.observation}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="presentation">Presentation</label>
            <input
                required
                id="presentation"
                name="presentation"
                value={values.presentation}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="proposal">Proposals</label>
            <select
                required
                id="proposal"
                name="proposal"
                value={values.proposal}
                onBlur={handleBlur}
                onChange={(event) => setFieldValue("proposal", event)}
            >
                {proposals.map((item: any) => (
                    <option value={item.id}>{item.title}</option>
                ))}
            </select>
            <label htmlFor="relevance">Relevance</label>
            <input
                required
                id="relevance"
                name="relevance"
                value={values.relevance}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="teacher">Teachers</label>
            <select
                required
                id="teacher"
                name="teacher"
                value={values.teacher}
                onBlur={handleBlur}
                onChange={(event) => setFieldValue("teacher", event)}
            >
                {teachers.map((item: any) => (
                    <option value={item.id}>{item.name}</option>
                ))}
            </select>
            <label htmlFor="textContent">Text Content</label>
            <input
                required
                id="textContent"
                name="textContent"
                value={values.textContent}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="textStructure">Text Structure</label>
            <input
                required
                id="textStructure"
                name="textStructure"
                value={values.textStructure}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="title">Title</label>
            <input
                required
                id="title"
                name="title"
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="type">Types</label>
            <select
                required
                id="type"
                name="type"
                value={values.type}
                onBlur={handleBlur}
                onChange={(event) => setFieldValue("type", event)}
            >
                {types.map((type: any) => (
                    <option value={type}>{type}</option>
                ))}
            </select>
            <button onClick={() => redirect(ROUTES.HOME())}>Voltar</button>
            <button type="submit">Registrar</button>
        </form >
    );
};

export default RegisterExaminationComponent;