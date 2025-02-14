'use client';

import { useStudentMutations, useStudents } from "@/hooks/rqs/students";

export default function StudentsList() {
  const {
    data: students,
    isLoading,
    error,
  } = useStudents();

  const mutations = useStudentMutations();
  // Show loading state outside of Suspense
  if (isLoading) return <div>Loading students...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const handleCreateStudent = async () => {
    try {
      await mutations.create.mutateAsync({
        name: 'New Student',
        // other properties
      });
    } catch (error) {
      console.error('Failed to create student:', error);
    }
  };



  return (
    <div>
      <button
        onClick={handleCreateStudent}
        disabled={mutations.create.isPending}
      >
        {mutations.create.isPending ? 'Adding...' : 'Add Student'}
      </button>

      <ul>
        {students?.map((student) => (
          <li key={student.id}>
            {student.name}
            <button
              onClick={() => mutations.delete.mutate(student.id)}
              disabled={mutations.delete.isPending}
            >
              {mutations.delete.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}