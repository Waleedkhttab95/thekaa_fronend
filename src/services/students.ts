import { axiosClient } from "@/lib/axios";
import { IStudent } from "@/types/student.type";

const API_ROUTE = "student";

// API functions
export const getStudents = async (
  page: number,
  limit: number
): Promise<IStudent[]> => {
  const { data } = await axiosClient.get(`/${API_ROUTE}`, {
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const createStudent = async (newStudent: Omit<IStudent, "id">) => {
  const { data } = await axiosClient.post(`/${API_ROUTE}`, newStudent);
  return data;
};

export const updateStudent = async ({ id, ...updateData }: IStudent) => {
  const { data } = await axiosClient.put(`/${API_ROUTE}/${id}`, updateData);
  return data;
};

export const deleteStudent = async (id: string) => {
  const { data } = await axiosClient.delete(`/${API_ROUTE}/${id}`);
  return data;
};
