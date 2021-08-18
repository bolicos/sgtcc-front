export enum Type {
    PRE_EVALUATION = "Pré Avaliação",
    FINAL_EVALUATION = "Avaliação Final"
}

export interface TitleModel {
    description: string;
    id: number;
    nomenclature: string;
    type: string;
}

export interface TeacherModel {
    cpf: string;
    email: string;
    idTitle: number;
    name: string;
    phone: string;
    registration: string;
}

export interface TeacherDetailsModel {
    cpf: string;
    createdAt: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    registration: string;
    title: {
        description: string;
        id: number;
        nomenclature: string;
        type: string;
    }
}

export interface EditTeacherModel {
    email: string;
    phone: string;
    title: {
        description: string;
        id: number;
        nomenclature: string;
        type: string;
    }
}

export interface StudentModel {
    cpf: string;
    email: string;
    name: string;
    phone: string;
    registration: string;
}

export interface StudentDetailsModel {
    cpf: string;
    createdAt: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    registration: string;
}

export interface EditStudentModel {
    email: string;
    phone: string;
}

export interface ProposalDetailsModel {
    author: {
        cpf: string;
        createdAt: string;
        email: string;
        id: number;
        name: string;
        phone: string;
        registration: string;
    };
    createdAt: string;
    id: number;
    leader: {
        cpf: string;
        createdAt: string;
        email: string;
        id: number;
        name: string;
        phone: string;
        registration: string;
        title: {
            description: string;
            id: number;
            nomenclature: string;
            type: string;
        }
    }
    title: string;
}

export interface EditProposalModel {
    leader: {
        cpf: string;
        createdAt: string;
        email: string;
        id: number;
        name: string;
        phone: string;
        registration: string;
        title: {
            description: string;
            id: number;
            nomenclature: string;
            type: string;
        }
    }
    title: string;
}

export interface ExaminationModel {
    approved: boolean;
    language: string;
    note: number;
    observation: string;
    presentation: string;
    proposal: number;
    relevance: string;
    teacher: number;
    textContent: string;
    textStructure: string;
    title: string;
    type: Type
}

export interface ExaminationDetailsModel {
    approved: boolean;
    createdAt: string;
    id: number;
    language: string;
    note: number;
    observation: string;
    presentation: string;
    proposal: {
        author: {
            cpf: string;
            createdAt: string;
            email: string;
            id: number;
            name: string;
            phone: string;
            registration: string
        };
        createdAt: string;
        id: number;
        leader: {
            cpf: string;
            createdAt: string;
            email: string;
            id: number;
            name: string;
            phone: string;
            registration: string;
            title: {
                description: string;
                id: number;
                nomenclature: string;
                type: string
            }
        };
        title: string
    };
    relevance: string;
    teacher: {
        cpf: string;
        createdAt: string;
        email: string;
        id: number;
        name: string;
        phone: string;
        registration: string;
        title: {
            description: string;
            id: number;
            nomenclature: string;
            type: string
        }
    };
    textContent: string;
    textStructure: string;
    title: string;
    type: Type
}

export interface EditExaminationModel {
    approved: boolean;
    language: string;
    note: number;
    observation: string;
    presentation: string;
    relevance: string;
    textContent: string;
    textStructure: string;
    title: string;
    type: Type
}

export interface BoardDetailsModel {
    aclass: {
        createdAt: string;
        id: number;
        name: string;
        semester: {
            id: number;
            name: string
        };
        students: {
            additionalProp1: number;
            additionalProp2: number;
            additionalProp3: number
        };
        teacher: {
            cpf: string;
            createdAt: string;
            email: string;
            id: number;
            name: string;
            phone: string;
            registration: string;
            title: {
                description: string;
                id: number;
                nomenclature: string;
                type: string
            }
        }
    };
    createdAt: string;
    dateScheduled: string;
    evaluators: [
        {
            cpf: string;
            createdAt: string;
            email: string;
            id: number;
            name: string;
            phone: string;
            registration: string;
            title: {
                description: string;
                id: number;
                nomenclature: string;
                type: string
            }
        }
    ];
    id: number;
    leader: {
        cpf: string;
        createdAt: string;
        email: string;
        id: number;
        name: string;
        phone: string;
        registration: string;
        title: {
            description: string;
            id: number;
            nomenclature: string;
            type: string
        }
    };
    proposal: {
        author: {
            cpf: string;
            createdAt: string;
            email: string;
            id: number;
            name: string;
            phone: string;
            registration: string
        };
        createdAt: string;
        id: number;
        leader: {
            cpf: string;
            createdAt: string;
            email: string;
            id: number;
            name: string;
            phone: string;
            registration: string;
            title: {
                description: string;
                id: number;
                nomenclature: string;
                type: string
            }
        };
        title: string
    }
}

export interface EditBoardModel {
    dateScheduled: string;
    evaluators: [
        {
            id: number;
        }
    ];
    leader: {
        id: number;
    };

}

export interface ClassDetailsModel {
    createdAt: string;
    id: number;
    name: string;
    semester: {
        id: number;
        name: string
    };
    students: {
        additionalProp1: number;
        additionalProp2: number;
        additionalProp3: number
    };
    teacher: {
        cpf: string;
        createdAt: string;
        email: string;
        id: number;
        name: string;
        phone: string;
        registration: string;
        title: {
            description: string;
            id: number;
            nomenclature: string;
            type: string
        }
    }
}



