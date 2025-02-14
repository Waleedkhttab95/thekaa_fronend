"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { STUDENTS_QUERY } from "@/config/qr.constants";
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "@/services/students";

// Hooks
export const useStudents = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: [STUDENTS_QUERY, page, limit],
    queryFn: () => getStudents(page, limit),
    staleTime: 1000 * 60 * 5, /// Fresh for 5 mins
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
