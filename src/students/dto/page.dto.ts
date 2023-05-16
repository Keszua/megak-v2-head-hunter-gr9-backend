import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly students: T[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(studentEntities: T[], meta: PageMetaDto) {
    this.students = studentEntities;
    this.meta = meta;
  }
}
