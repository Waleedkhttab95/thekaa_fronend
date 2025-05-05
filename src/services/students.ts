import { IStudentData } from "@/types/student.type";
import { AxiosInstance } from "axios";

const API_ROUTE = "student/student";

export const getStudents = async (
  axiosClient: AxiosInstance
): Promise<IStudentData[]> => {
  const { data } = await axiosClient.get(`/${API_ROUTE}/my-students`);
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
export const updateStudentAvatar = async (
  axiosClient: AxiosInstance,
  { _id, avatar }: { _id: string; avatar: File }
) => {
  const formData = new FormData();
  formData.append("image", avatar);
  const { data } = await axiosClient.post(
    `/${API_ROUTE}/${_id}/profile-image`,
    {
      image: avatar,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const deleteStudent = async (
  axiosClient: AxiosInstance,
  _id: string
) => {
  const { data } = await axiosClient.delete(`/${API_ROUTE}/${_id}`);
  return data;
};
