import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { EditBoardProps } from "#/models/props";
import { EditBoardModel } from "#/models/sgtcc";
import { ROUTES } from "#/constants";

export const EditBoard: React.FC<EditBoardProps> = ({ teachers, board, columns, onConfirmEditBoard, ...props }) => {
    const history = useHistory();

    const { handleBlur, handleSubmit, handleChange, setFieldValue, values } = useFormik({
        initialValues: {
            dateScheduled: board.dateScheduled,
            evaluators: board.evaluators,
            leader: {
                id: board.leader.id,
            },
        },
        onSubmit: (board: EditBoardModel) => {
            onConfirmEditBoard(board);
        },
    });

    function redirect(route: string) {
        history.push(route);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="dateScheduled">dateScheduled</label>
            <input
                required
                id="dateScheduled"
                name="dateScheduled"
                value={values.dateScheduled}
                onBlur={handleBlur}
                onChange={handleChange}
            />

            <label htmlFor="evaluators">Avaliadores</label>
            <select
                required
                id="evaluators"
                name="evaluators"
                onBlur={handleBlur}
                onChange={(event) => setFieldValue("evaluators", event)}
                multiple
            >
                {teachers.map((item: any) => (
                    <option value={item.id}>{item.name}</option>
                ))}
            </select>

            <label htmlFor="leader.id">Professores</label>
            <select
                required
                id="leader.id"
                name="leader.id"
                value={values.leader.id}
                onBlur={handleBlur}
                onChange={(event) => setFieldValue("leader.id", event)}
            >
                {teachers.map((item: any) => (
                    <option value={item.id}>{item.name}</option>
                ))}
            </select>
            <button onClick={() => redirect(ROUTES.HOME())}>Voltar</button>
            <button type="submit">Editar</button>
        </form>
    );
};

export default EditBoard;
