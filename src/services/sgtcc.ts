import { Response, client } from "./clients";
import {
  Type,
  TitleModel,
  ClassDetailsModel,
  TeacherModel,
  TeacherDetailsModel,
  EditTeacherModel,
  StudentDetailsModel,
  EditStudentModel,
  ProposalDetailsModel,
  ExaminationModel,
  ExaminationDetailsModel,
  EditExaminationModel,
  BoardDetailsModel,
  EditBoardModel,
} from "#/models/sgtcc";
import { ProposalEditRequest, ProposalRequest } from "#/models/request/proposal";
import { StudentRequest } from "#/models/request/student";
import { BoardRequest } from "#/models/request/board";
import { ResourceCreate } from "#/models/resource/created";
import { User } from "#/models/user";

interface List<T> extends Promise<Response<Array<T>>> { }
interface Object<T> extends Promise<Response<T>> { }

export const ENDPOINTS = {
  SIGN_IN: () => "https://global-auth-api.herokuapp.com/api/login",

  TYPE_LIST: () => "/api/v1/types",

  TITLE_LIST: () => "/api/v1/titles",

  CLASS_LIST: () => "/api/v1/classes",

  TEACHER_LIST: () => "/api/v1/teachers",
  TEACHER_CREATE: () => "/api/v1/teachers",
  TEACHER_DETAILS: (id: string) => `/api/v1/teachers/${id}`,
  TEACHER_EDIT: (id: string) => `/api/v1/teachers/${id}`,

  STUDENT_LIST: () => "/api/v1/students",
  STUDENT_CREATE: () => "/api/v1/students",
  STUDENT_DETAILS: (id: string) => `/api/v1/students/${id}`,
  STUDENT_EDIT: (id: string) => `/api/v1/students/${id}`,

  PROPOSAL_LIST: () => "/api/v1/proposals",
  PROPOSAL_CREATE: () => "/api/v1/proposals",
  PROPOSAL_DETAILS: (id: string) => `/api/v1/proposals/${id}`,
  PROPOSAL_EDIT: (id: string) => `/api/v1/proposals/${id}`,

  EXAMINATION_CREATE: () => "/api/v1/examinations",
  EXAMINATION_DETAILS: (id: string) => `/api/v1/examinations/${id}`,
  EXAMINATION_EDIT: (id: string) => `/api/v1/examinations/${id}`,

  BOARD_CREATE: () => "/api/v1/boards",
  BOARD_DETAILS: (id: string) => `/api/v1/boards/${id}`,
  BOARD_EDIT: (id: string) => `/api/v1/boards/${id}`,
};

export const API = {
  AUTH: {
    SIGN_IN: (body: User): Object<User> => client.post(ENDPOINTS.SIGN_IN(), body),
  },

  TYPE: {
    TYPE_LIST: (): List<Type> => client.get<Array<Type>>(ENDPOINTS.TYPE_LIST()),
  },

  TITLE: {
    TITLE_LIST: (): List<TitleModel> => client.get<Array<TitleModel>>(ENDPOINTS.TITLE_LIST()),
  },

  CLASS: {
    CLASS_LIST: (): List<ClassDetailsModel> => client.get<Array<ClassDetailsModel>>(ENDPOINTS.CLASS_LIST()),
  },

  TEACHER: {
    TEACHER_LIST: (): List<TeacherDetailsModel> => client.get<Array<TeacherDetailsModel>>(ENDPOINTS.TEACHER_LIST()),
    TEACHER_CREATE: (body: TeacherModel): Object<TeacherModel> => client.post(ENDPOINTS.TEACHER_CREATE(), body),
    TEACHER_DETAILS: (id: string): Object<TeacherDetailsModel> => client.get(ENDPOINTS.TEACHER_DETAILS(id)),
    TEACHER_EDIT: (id: string, body: EditTeacherModel): Object<EditTeacherModel> =>
      client.put(ENDPOINTS.TEACHER_EDIT(id), body),
  },
  STUDENT: {
    STUDENT_LIST: (): List<StudentDetailsModel> => client.get<Array<TeacherDetailsModel>>(ENDPOINTS.STUDENT_LIST()),
    STUDENT_CREATE: (body: StudentRequest): Object<ResourceCreate> => client.post(ENDPOINTS.STUDENT_CREATE(), body),
    STUDENT_DETAILS: (id: string): Object<StudentDetailsModel> => client.get(ENDPOINTS.STUDENT_DETAILS(id)),
    STUDENT_EDIT: (id: string, body: EditStudentModel): Object<EditStudentModel> =>
      client.put(ENDPOINTS.STUDENT_EDIT(id), body),
  },
  PROPOSAL: {
    PROPOSAL_LIST: (): List<ProposalDetailsModel> => client.get<Array<ProposalDetailsModel>>(ENDPOINTS.PROPOSAL_LIST()),
    PROPOSAL_CREATE: (body: ProposalRequest): Object<ResourceCreate> => client.post(ENDPOINTS.PROPOSAL_CREATE(), body),
    PROPOSAL_DETAILS: (id: string): Object<ProposalDetailsModel> => client.get(ENDPOINTS.PROPOSAL_DETAILS(id)),
    PROPOSAL_EDIT: (id: string, body: ProposalEditRequest): Object<ProposalDetailsModel> =>
      client.put(ENDPOINTS.PROPOSAL_EDIT(id), body),
  },
  EXAMINATION: {
    EXAMINATION_CREATE: (body: ExaminationModel): Object<ResourceCreate> =>
      client.post(ENDPOINTS.EXAMINATION_CREATE(), body),
    EXAMINATION_DETAILS: (id: string): Object<ExaminationDetailsModel> => client.get(ENDPOINTS.EXAMINATION_DETAILS(id)),
    EXAMINATION_EDIT: (id: string, body: EditExaminationModel): Object<EditExaminationModel> =>
      client.put(ENDPOINTS.EXAMINATION_EDIT(id), body),
  },

  BOARD: {
    BOARD_CREATE: (body: BoardRequest): Object<ResourceCreate> => client.post(ENDPOINTS.BOARD_CREATE(), body),
    BOARD_DETAILS: (id: string): Object<BoardDetailsModel> => client.get(ENDPOINTS.BOARD_DETAILS(id)),
    BOARD_EDIT: (id: string, body: EditBoardModel): Object<EditBoardModel> =>
      client.put(ENDPOINTS.BOARD_EDIT(id), body),
  },
};
