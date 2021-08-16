import { Response, client } from "./clients";
import { TitleModel, TeacherModel, StudentModel, TeacherDetailsModel, EditTeacherModel, StudentDetailsModel, EditStudentModel, ProposalDetailsModel, EditProposalModel } from "#/models/sgtcc";

interface List<T> extends Promise<Response<Array<T>>> { }
interface Object<T> extends Promise<Response<T>> { }

export const ENDPOINTS = {
  TITLE_LIST: () => "/api/v1/titles",
  REGISTER_TEACHER: () => "/api/v1/teachers",
  REGISTER_STUDENT: () => "/api/v1/students",
  TEACHER_DETAILS: (id: string) => `/api/v1/teachers/${id}`,
  EDIT_TEACHER: (id: string) => `/api/v1/teachers/${id}`,
  STUDENT_DETAILS: (id: string) => `/api/v1/students/${id}`,
  EDIT_STUDENT: (id: string) => `/api/v1/students/${id}`,
  PROPOSAL_DETAILS: (id: string) => `/api/v1/proposals/${id}`,
  TEACHER_LIST: () => "/api/v1/teachers",
  EDIT_PROPOSAL: (id: string) => `/api/v1/proposals/${id}`,
  STUDENT_LIST: () => "/api/v1/students",
};

export const API = {
  title_list: (): List<TitleModel> => client.get<Array<TitleModel>>(ENDPOINTS.TITLE_LIST()),
  register_teacher: (body: TeacherModel): Object<TeacherModel> => client.post(ENDPOINTS.REGISTER_TEACHER(), body),
  register_student: (body: StudentModel): Object<StudentModel> => client.post(ENDPOINTS.REGISTER_STUDENT(), body),
  teacher_details: (id: string): Object<TeacherDetailsModel> => client.get(ENDPOINTS.TEACHER_DETAILS(id)),
  edit_teacher: (id: string, body: EditTeacherModel): Object<EditTeacherModel> => client.put(ENDPOINTS.EDIT_TEACHER(id), body),
  student_details: (id: string): Object<StudentDetailsModel> => client.get(ENDPOINTS.STUDENT_DETAILS(id)),
  edit_student: (id: string, body: EditStudentModel): Object<EditStudentModel> => client.put(ENDPOINTS.EDIT_STUDENT(id), body),
  proposal_details: (id: string): Object<ProposalDetailsModel> => client.get(ENDPOINTS.PROPOSAL_DETAILS(id)),
  teacher_list: (): List<TeacherDetailsModel> => client.get<Array<TeacherDetailsModel>>(ENDPOINTS.TEACHER_LIST()),
  edit_proposal: (id: string, body: EditProposalModel): Object<EditProposalModel> => client.put(ENDPOINTS.EDIT_PROPOSAL(id), body),
  student_list: (): List<StudentDetailsModel> => client.get<Array<TeacherDetailsModel>>(ENDPOINTS.STUDENT_LIST()),
};