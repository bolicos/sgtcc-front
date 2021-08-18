import { Response, client } from "./clients";
import {
  TitleModel,
  TeacherModel,
  TeacherDetailsModel,
  EditTeacherModel,
  StudentDetailsModel,
  EditStudentModel,
  ProposalDetailsModel,
} from "#/models/sgtcc";
import { ProposalEditRequest, ProposalRequest } from "#/models/request/proposal";
import { StudentRequest } from "#/models/request/student";
import { ResourceCreate } from "#/models/resource/created";

interface List<T> extends Promise<Response<Array<T>>> {}
interface Object<T> extends Promise<Response<T>> {}

export const ENDPOINTS = {
  TITLE_LIST: () => "/api/v1/titles",

  TEACHER_LIST: () => "/api/v1/teachers",
  TEACHER_CREATE: () => "/api/v1/teachers",
  TEACHER_DETAILS: (id: string) => `/api/v1/teachers/${id}`,
  TEACHER_EDIT: (id: string) => `/api/v1/teachers/${id}`,

  STUDENT_LIST: () => "/api/v1/students",
  STUDENT_CREATE: () => "/api/v1/students",
  STUDENT_DETAILS: (id: string) => `/api/v1/students/${id}`,
  STUDENT_EDIT: (id: string) => `/api/v1/students/${id}`,

  PROPOSAL_CREATE: () => "/api/v1/proposals",
  PROPOSAL_DETAILS: (id: string) => `/api/v1/proposals/${id}`,
  PROPOSAL_EDIT: (id: string) => `/api/v1/proposals/${id}`,
};

export const API = {
  TITLE: {
    TITLE_LIST: (): List<TitleModel> => client.get<Array<TitleModel>>(ENDPOINTS.TITLE_LIST()),
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
    PROPOSAL_CREATE: (body: ProposalRequest): Object<ResourceCreate> => client.post(ENDPOINTS.PROPOSAL_CREATE(), body),
    PROPOSAL_DETAILS: (id: string): Object<ProposalDetailsModel> => client.get(ENDPOINTS.PROPOSAL_DETAILS(id)),
    PROPOSAL_EDIT: (id: string, body: ProposalEditRequest): Object<ProposalDetailsModel> =>
      client.put(ENDPOINTS.PROPOSAL_EDIT(id), body),
  },
};
