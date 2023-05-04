import { BadRequestException, Logger } from '@nestjs/common';
import { Request } from 'express';
import * as mime from 'mime-types';

export const csvFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: BadRequestException | null, accepted: boolean) => void,
): void => {
  const mimeType = mime.lookup(file.originalname);
  if (mimeType !== 'text/csv' && mimeType !== 'application/vnd.ms-excel') {
    Logger.warn(
      `File upload failed: Invalid file type for "${file.originalname}"`,
      csvFileFilter.name,
    );
    return callback(
      new BadRequestException('Invalid file type. Only CSV files are allowed.'),
      false,
    );
  }
  Logger.log(`File "${file.originalname}" uploaded and processed successfully`, csvFileFilter.name);
  callback(null, true);
};
