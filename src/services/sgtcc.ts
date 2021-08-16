import { Response } from "./clients";

interface List<T> extends Promise<Response<Array<T>>> { }
interface Object<T> extends Promise<Response<T>> { }

export const ENDPOINTS = {
  LIST: () => "/api/v1/example",
  DELETE_BY_ID: (id: string) => `/api/v1/example/${id}`,
  FIND_BY_ID: (id: string) => `/api/v1/example/${id}`,
  EDIT_BY_ID: (id: string) => `/api/v1/example/${id}`,
  CREATE: () => "/api/v1/example",
};

export const API = {
  // list: (): List<ExampleModel> => client.get<Array<ExampleModel>>(ENDPOINTS.LIST()),
  // delete: (id: string): Object<void> => client.delete(ENDPOINTS.DELETE_BY_ID(id)),
  // details: (id: string): Object<ExampleModel> => client.get(ENDPOINTS.FIND_BY_ID(id)),
  // edit: (id: string, body: ExampleModel): Object<ExampleModel> => client.put(ENDPOINTS.EDIT_BY_ID(id), body),
  // create: (body: ExampleModel): Object<ExampleModel> => client.post(ENDPOINTS.CREATE(), body),
};