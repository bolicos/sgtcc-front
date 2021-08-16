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

export interface StudentModel {
    cpf: string;
    email: string;
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


