import { IsString } from 'class-validator';
import { HrEntity } from 'src/types';

export class CreateHrDto implements Omit<HrEntity, 'id' | 'user' | 'maxReservedStudents'> {
  @IsString()
  fullName: string;

  @IsString()
  company: string;
}
