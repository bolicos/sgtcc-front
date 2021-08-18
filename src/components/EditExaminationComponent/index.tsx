import React from "react";
import { Field, useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { EditExaminationProps } from "#/models/props";
import { EditExaminationModel } from "#/models/sgtcc";
import { ROUTES } from "#/constants";

export const EditExamination: React.FC<EditExaminationProps> = ({ types, examination, columns, onConfirmEditExamination, ...props }) => {
    const history = useHistory();

    const { handleBlur, handleSubmit, handleChange, setFieldValue, values } = useFormik({
        initialValues: {
            approved: examination.approved,
            language: examination.language,
            note: examination.note,
            observation: examination.observation,
            presentation: examination.presentation,
            relevance: examination.relevance,
            textContent: examination.textContent,
            textStructure: examination.textStructure,
            title: examination.title,
            type: examination.type,
        },
        onSubmit: (examination: EditExaminationModel) => {
            onConfirmEditExamination(examination);
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
            <label htmlFor="observation">observation</label>
            <input
                required
                id="observation"
                name="observation"
                value={values.observation}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="presentation">presentation</label>
            <input
                required
                id="presentation"
                name="presentation"
                value={values.presentation}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="relevance">relevance</label>
            <input
                required
                id="relevance"
                name="relevance"
                value={values.relevance}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="textContent">textContent</label>
            <input
                required
                id="textContent"
                name="textContent"
                value={values.textContent}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="textStructure">textStructure</label>
            <input
                required
                id="textStructure"
                name="textStructure"
                value={values.textStructure}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label htmlFor="title">title</label>
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
            <button type="submit">Editar</button>
        </form>
    );
};

export default EditExamination;
