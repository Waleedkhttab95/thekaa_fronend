'use client';

import { useStudentMutations, useStudents } from "@/hooks/rqs/students";

export default function StudentsList() {
  const { data: students, isLoading, error, } = useStudents();
  const mutations = useStudentMutations();


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
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <button onClick={handleCreateStudent}>Add Student</button>
      <ul>
        {students?.map((student) => (
          <li key={student.id}>
            {student.name}
            <button
              onClick={() => mutations.delete.mutate(student.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}