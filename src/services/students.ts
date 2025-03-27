import { IStudentData } from "@/types/student.type";
import { AxiosInstance } from "axios";

const API_ROUTE = "student/student";

export const getStudents = async (
  axiosClient: AxiosInstance,
  page: number,
  limit: number
): Promise<IStudentData[]> => {
  const { data } = await axiosClient.get(`/${API_ROUTE}`, {
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const getStudentById = async (
  axiosClient: AxiosInstance,
  id: string
): Promise<IStudentData> => {
  const { data } = await axiosClient.get(`/${API_ROUTE}/${id}`);
  return data;
};

export const createStudent = async (
  axiosClient: AxiosInstance,
  newStudent: Partial<IStudentData>
) => {
  const { data } = await axiosClient.post(`/${API_ROUTE}`, newStudent);
  return data;
};

export const updateStudent = async (
  axiosClient: AxiosInstance,
  { _id, ...updateData }: Partial<IStudentData>
) => {
  const { data } = await axiosClient.put(`/${API_ROUTE}/${_id}`, updateData);
  return data;
};

export const deleteStudent = async (
  axiosClient: AxiosInstance,
  _id: string
) => {
  const { data } = await axiosClient.delete(`/${API_ROUTE}/${_id}`);
  return data;
};
