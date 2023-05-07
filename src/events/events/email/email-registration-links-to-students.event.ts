import { Student } from '../../../students/entities';

export class EmailRegistrationLinksToStudentsEvent {
  students: Student[];
}
