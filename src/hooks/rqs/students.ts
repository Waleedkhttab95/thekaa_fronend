"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { STUDENTS_QUERY } from "@/config/qr.constants";
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
} from "@/services/students";
import { IStudentData } from "@/types/student.type";
import { AxiosInstance } from "axios";

// Hooks
export const useStudents = (
  axiosClient: AxiosInstance,
  page: number = 1,
  limit: number = 10
) => {
  return useQuery({
    queryKey: [STUDENTS_QUERY, page, limit],
    queryFn: () => getStudents(axiosClient, page, limit),
    staleTime: 1000 * 60 * 5, /// Fresh for 5 mins
  });
};
export const useStudent = (axiosClient: AxiosInstance, id: string) => {
  return useQuery({
    queryKey: [STUDENTS_QUERY, id],
    queryFn: () => getStudentById(axiosClient, id),
    staleTime: 1000 * 60 * 5, /// Fresh for 5 mins
  });
};

export const useStudentMutations = (axiosClient: AxiosInstance) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: Partial<IStudentData>) =>
      createStudent(axiosClient, data),
    onMutate: async (newStudent: Partial<IStudentData>) => {
      await queryClient.cancelQueries({ queryKey: [STUDENTS_QUERY] });
      // when request is start loadings
      const oldData =
        queryClient.getQueryData<IStudentData[]>([STUDENTS_QUERY]) || [];
      if (oldData.length > 0) {
        queryClient.setQueryData([STUDENTS_QUERY], () => [
          {
            ...newStudent,
          },
          ...oldData,
        ]);
      } else {
        queryClient.setQueryData([STUDENTS_QUERY], () => [
          {
            ...newStudent,
          },
        ]);
      }
      return { oldData };
    },
    onError: (err, variables, context) => {
      // rollback the old data if error occurred
      if (context?.oldData) {
        queryClient.setQueryData([STUDENTS_QUERY], context);
      }

      console.error(`${err.name} | ${err.message}`);
    },
    onSettled: () => {
      // refetch data after mutation completes
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<IStudentData>) =>
      updateStudent(axiosClient, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [STUDENTS_QUERY] });

      // when request is start loadings
      const oldData =
        queryClient.getQueryData<IStudentData[]>([STUDENTS_QUERY]) || [];

      queryClient.setQueryData([STUDENTS_QUERY], (newStudent: IStudentData) => {
        oldData.map((student) => {
          if (student._id === newStudent._id) {
            return {
              ...student,
              ...newStudent,
            };
          }
          return student;
        });
      });

      return { oldData };
    },

    onError: (err, variables, context) => {
      // rollback the old data if error occurred
      if (context?.oldData) {
        queryClient.setQueryData([STUDENTS_QUERY], context);
      }
      console.error(`${err.name} | ${err.message}`);
    },
    onSettled: () => {
      // refetch data after mutation completes
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteStudent(axiosClient, id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [STUDENTS_QUERY] });

      // when request is start loadings
      const oldData =
        queryClient.getQueryData<IStudentData[]>([STUDENTS_QUERY]) || [];

      queryClient.setQueryData([STUDENTS_QUERY], (newStudent: IStudentData) => {
        return oldData.filter((student) => student._id !== newStudent._id);
      });
      return { oldData };
    },
    onError: (err, variables, context) => {
      // rollback the old data if error occurred
      if (context?.oldData) {
        queryClient.setQueryData([STUDENTS_QUERY], context);
      }
      console.error(`${err.name} | ${err.message}`);
    },
    onSettled: () => {
      // refetch data after mutation completes
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY] });
    },
  });

  return {
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,
  };
};
