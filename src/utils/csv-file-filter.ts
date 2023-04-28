import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import * as mime from 'mime-types';

export const csvFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: BadRequestException | null, accepted: boolean) => void,
): void => {
  const mimeType = mime.lookup(file.originalname);
  if (mimeType !== 'text/csv' && mimeType !== 'application/vnd.ms-excel') {
    return callback(
      new BadRequestException('Invalid file type. Only CSV files are allowed.'),
      false,
    );
  }
  callback(null, true);
};
