export interface GenericModel {
    title: string;
    function: string;
}

export interface RegisterTeacherProps {
    titles: any;
    teacher: any;
    columns: GenericModel[];
    onConfirmRegisterTeacher: (body: any) => void;
}

export interface RegisterStudentProps {
    student: any;
    columns: GenericModel[];
    onConfirmRegisterStudent: (body: any) => void;
}

export interface TeacherDetailsProps {
    teacher: any;
    columns: GenericModel[];
}

export interface EditTeacherProps {
    titles: any;
    teacher: any;
    columns: GenericModel[];
    onConfirmEditTeacher: (body: any) => void;
}

export interface StudentDetailsProps {
    student: any;
    columns: GenericModel[];
}

export interface EditStudentProps {
    student: any;
    columns: GenericModel[];
    onConfirmEditStudent: (body: any) => void;
}

export interface ProposalDetailsProps {
    proposal: any;
    columns: GenericModel[];
}

export interface EditProposalProps {
    teachers: any;
    proposal: any;
    columns: GenericModel[];
    onConfirmEditProposal: (body: any) => void;
}


