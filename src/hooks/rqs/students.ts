"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
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
export const useStudents = (axiosClient: AxiosInstance) => {
  return useQuery({
    queryKey: [STUDENTS_QUERY],
    queryFn: () => getStudents(axiosClient),
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
  const createMutation = useMutation({
    mutationFn: (data: Partial<IStudentData>) =>
      createStudent(axiosClient, data),
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<IStudentData>) =>
      updateStudent(axiosClient, data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteStudent(axiosClient, id),
  });

  return {
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,
  };
};
