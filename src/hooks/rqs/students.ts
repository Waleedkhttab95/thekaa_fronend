"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { STUDENTS_QUERY } from "@/config/qr.constants";
import { createStudent, getStudents } from "@/services/students";
import { IStudentData } from "@/types/student.type";

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
    onMutate: async (newStudent: Omit<IStudentData, "_id">) => {
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

  // const updateMutation = useMutation({
  //   mutationFn: updateStudent,
  //   onMutate: () => {
  //     // when request is start loadings
  //     const oldData =
  //       queryClient.getQueryData<IStudentData[]>([STUDENTS_QUERY]) || [];

  //     queryClient.setQueryData([STUDENTS_QUERY], (newStudent: IStudentData) => {
  //       oldData.map((student) => {
  //         if (student._id === newStudent._id) {
  //           return {
  //             ...student,
  //             ...newStudent,
  //           };
  //         }
  //         return student;
  //       });
  //     });

  //     return { oldData };
  //   },

  //   onError: (err, variables, context) => {
  //     // rollback the old data if error occurred
  //     if (context?.oldData) {
  //       queryClient.setQueryData([STUDENTS_QUERY], context);
  //     }
  //     console.error(`${err.name} | ${err.message}`);
  //   },
  //   onSettled: () => {
  //     // refetch data after mutation completes
  //     queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY] });
  //   },
  // });

  // const deleteMutation = useMutation({
  //   mutationFn: deleteStudent,
  //   onMutate: () => {
  //     // when request is start loadings
  //     const oldData =
  //       queryClient.getQueryData<IStudentData[]>([STUDENTS_QUERY]) || [];

  //     queryClient.setQueryData([STUDENTS_QUERY], (newStudent: IStudentData) => {
  //       return oldData.filter((student) => student._id !== newStudent._id);
  //     });
  //     return { oldData };
  //   },
  //   onError: (err, variables, context) => {
  //     // rollback the old data if error occurred
  //     if (context?.oldData) {
  //       queryClient.setQueryData([STUDENTS_QUERY], context);
  //     }
  //     console.error(`${err.name} | ${err.message}`);
  //   },
  //   onSettled: () => {
  //     // refetch data after mutation completes
  //     queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY] });
  //   },
  // });

  return {
    create: createMutation,
    // update: updateMutation,
    // delete: deleteMutation,
  };
};
