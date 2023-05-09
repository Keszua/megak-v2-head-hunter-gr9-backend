import { Transform } from 'class-transformer';

export class PageMetaDto {
  readonly page: number;

  readonly take: number;

  readonly itemCount: number;

  @Transform(({ obj }) => Math.ceil(obj.itemCount / obj.take))
  readonly pageCount: number;

  @Transform(({ obj }) => obj.page > 1)
  readonly hasPreviousPage: boolean;

  @Transform(({ obj }) => obj.page < obj.pageCount)
  readonly hasNextPage: boolean;
}
