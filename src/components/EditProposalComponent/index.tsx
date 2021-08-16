import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { EditProposalProps } from "#/models/props";
import { EditProposalModel } from "#/models/sgtcc";
import { ROUTES } from "#/constants";

export const EditProposal: React.FC<EditProposalProps> = ({ teachers, proposal, columns, onConfirmEditProposal, ...props }) => {
    const history = useHistory();

    const { handleBlur, handleSubmit, handleChange, setFieldValue, values } = useFormik({
        initialValues: {
            leader: {
                cpf: proposal.leader.cpf,
                createdAt: proposal.leader.createdAt,
                email: proposal.leader.email,
                id: proposal.leader.id,
                name: proposal.leader.name,
                phone: proposal.leader.phone,
                registration: proposal.leader.registration,
                title: {
                    description: proposal.leader.title.description,
                    nomenclature: proposal.leader.title.nomenclature,
                    id: proposal.leader.title.id,
                    type: proposal.leader.title.type,
                }
            },
            title: proposal.title
        },
        onSubmit: (proposal: EditProposalModel) => {
            onConfirmEditProposal(proposal);
        },
    });

    function redirect(route: string) {
        history.push(route);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title.id">Professores</label>
            <select
                required
                id="leader.id"
                name="leader.id"
                value={values.leader.id}
                onBlur={handleBlur}
                onChange={(event) => setFieldValue("leader.id", event)}
            >
                {teachers.map((item: any) => (
                    <option value={item.name}>{item.id}</option>
                ))}
            </select>
            <label htmlFor="title">Titulo</label>
            <input
                required
                id="title"
                name="title"
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <button onClick={() => redirect(ROUTES.HOME())}>Voltar</button>
            <button type="submit">Editar</button>
        </form>
    );
};

export default EditProposal;
