import * as Joi from 'joi';

export const envValidationObjectSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  /**
    Password validation will be added later
     */
  // DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().required(),
  DB_LOGGING: Joi.boolean().required(),
  CLIENT_URL: Joi.string().required(),
});
