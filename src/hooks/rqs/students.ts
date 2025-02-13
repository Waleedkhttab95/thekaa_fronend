"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { STUDENTS_QUERY } from "@/config/qr.constants";

// Types
interface Student {
  id: number;
  name: string;
  // other student properties
}

// API functions
export const getStudents = async (
  page: number,
  limit: number
): Promise<Student[]> => {
  const { data } = await axiosClient.get("/students", {
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const createStudent = async (newStudent: Omit<Student, "id">) => {
  const { data } = await axiosClient.post("/students", newStudent);
  return data;
};

export const updateStudent = async ({ id, ...updateData }: Student) => {
  const { data } = await axiosClient.put(`/students/${id}`, updateData);
  return data;
};

export const deleteStudent = async (id: number) => {
  const { data } = await axiosClient.delete(`/students/${id}`);
  return data;
};

// Hooks
export const useStudents = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: [STUDENTS_QUERY, page, limit],
    queryFn: () => getStudents(page, limit),
  });
};

export const useStudentMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY] });
    },
  });

  return {
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,
  };
};
