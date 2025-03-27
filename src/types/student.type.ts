export interface IStudent {
  id: string;
  name: string;
  // .. etc
}

export interface IStudentData {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  educationLevel: string;
  subject: string;
  avatar?: string;
  country: string;
  phone: string;
  gender: string;
}
