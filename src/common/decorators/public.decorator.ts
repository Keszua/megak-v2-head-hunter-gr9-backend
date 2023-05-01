import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);
