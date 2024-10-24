
interface ITaskDetail {
  _id: string;
  title: string;
  description: string;
  status:boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
interface ITaskRequest {
  title?: string;
  description?:string;
  status?: boolean;
  _id?:string;
}
interface ITasksResponse {
  docs: ITaskDetail[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface ITaskCardFields {
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
}
export type {
  ITaskDetail,
  ITaskRequest,
  ITasksResponse,
  ITaskCardFields,
};
