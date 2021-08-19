import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import EditBoardComponent from "#/components/EditBoardComponent";
import { DefaultState } from "#/models/default";
import { TeacherDetailsModel, EditBoardModel, BoardDetailsModel } from "#/models/sgtcc";
import { GenericModel } from "#/models/props";
import { API } from "#/services/sgtcc";

interface State extends DefaultState {
    teachers: TeacherDetailsModel[];
    board: EditBoardModel;
}

export const BoardEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<State>({
        loading: true,
        title: "Editar banca",
        teachers: [],
        board: {} as EditBoardModel,
    });

    const columns: GenericModel[] = [
        { title: "dateScheduled", function: "dateScheduled" },
        { title: "evaluators", function: "evaluators.id" },
        { title: "leader", function: "leader.id" },
    ];

    const teacherList = useCallback(() => {
        API.TEACHER.TEACHER_LIST()
            .then((response) => {
                const teachers: TeacherDetailsModel[] = response.data;
                setState((old) => ({ ...old, teachers: teachers }));
            })
            .catch((exception) => console.log("API error: ", exception))
            .finally(() => setState((old) => ({ ...old, loading: false })));
    }, []);

    useEffect(() => {
        teacherList();
    }, [teacherList]);

    const boardDetails = useCallback(() => {
        API.BOARD.BOARD_DETAILS(id)
            .then((response) => {
                const board: BoardDetailsModel = response.data;
                setState((old) => ({ ...old, board: board }));
            })
            .catch((exception) => console.log("API error: ", exception))
            .finally(() => setState((old) => ({ ...old, loading: false })));
    }, [id]);

    useEffect(() => {
        boardDetails();
    }, [boardDetails]);

    const editBoard = useCallback((body: EditBoardModel) => {
        API.BOARD.BOARD_EDIT(id, body)
            .then(() => {
                setState((old) => ({ ...old }));
            })
            .catch((exception) => console.log("API error: ", exception))
            .finally(() => setState((old) => ({ ...old, loading: false })));
    }, [id]);

    return state.loading === true ? (
        <Spinner animation="grow" />
    ) : (
        <>
            <h1>{state.title}</h1>
            <EditBoardComponent board={state.board} teachers={state.teachers} columns={columns} onConfirmEditBoard={editBoard} />
        </>
    );
};

export default BoardEdit;
