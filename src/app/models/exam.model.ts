import { User } from './user.model';
export interface Exam {
  student: User;
  note: number;
  dateExam: Date;
}
