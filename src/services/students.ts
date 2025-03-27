import { axiosClient } from "@/lib/axios";
import { IStudentData } from "@/types/student.type";

const API_ROUTE = "student/student";

// API functions
export const getStudents = async (
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

export const createStudent = async (newStudent: Omit<IStudentData, "_id">) => {
  const { data } = await axiosClient.post(`/${API_ROUTE}`, newStudent);
  return data;
};

export const updateStudent = async ({ _id, ...updateData }: IStudentData) => {
  const { data } = await axiosClient.put(`/${API_ROUTE}/${_id}`, updateData);
  return data;
};

export const deleteStudent = async (_id: string) => {
  const { data } = await axiosClient.delete(`/${API_ROUTE}/${_id}`);
  return data;
};
