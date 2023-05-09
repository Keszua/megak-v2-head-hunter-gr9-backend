import { StudentEntity } from '../../../types';

export class EmailRegistrationLinksToStudentsEvent {
  students: StudentEntity[];
}
