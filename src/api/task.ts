import { AxiosResponse } from "axios";
import { METHODS } from "../enums/axios.enum";
import createApi from "../utils/axios";
import {
  ITaskDetail,
  ITaskRequest,
  ITasksResponse,
} from "../types/interfaces/api/task.interface";

const taskApi = createApi("/task");



export const getTasks = async (pageParams?: {
  page?: number;
  limit?: number;
  q?: string;
  sort?: string;
}): Promise<ITasksResponse> => {
  console.log("hello");
  const { data } = (await taskApi({
    method: METHODS.GET,
    url: "",
    params: {
      limit: pageParams?.limit ? pageParams.limit : 8,
      page: pageParams?.page ? pageParams.page : 1,
      q: pageParams?.q ? pageParams.q : "",
      sort: pageParams?.sort ? pageParams.sort : "createdAt",
    },
  })) as AxiosResponse<ITasksResponse>;

  console.log(data)
  return data;
};

export const deleteTask = async (id: string) => {
  await taskApi({
    url: `/${id}`,
    method: METHODS.DELETE,
  });
};

export const taskById = async (taskId: string): Promise<ITaskDetail> => {
  const { data } = (await taskApi({
    url: `/${taskId}`,
    method: METHODS.GET,
  })) as AxiosResponse<ITaskDetail>;
  return data;
};

export const createTask = async (
  formBody: ITaskRequest
): Promise<ITaskDetail> => {
  const { data } = (await taskApi({
    data: formBody,
    headers: {
      "Content-Type": "application/json",
    },
    url: "/",
    method: METHODS.POST,
  })) as AxiosResponse<ITaskDetail>;
  return data;
};