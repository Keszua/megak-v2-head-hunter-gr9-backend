import * as Joi from 'joi';
//TODO Validation will be added later
export const envValidationObjectSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  // DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().required(),
  DB_LOGGING: Joi.boolean().required(),
  JWT_SECRET_ACTIVATION_TOKEN: Joi.string().required(),
  JWT_EXPIRATION_TIME_ACTIVATION_TOKEN: Joi.number().required(),
  JWT_SECRET_PASSWORD_RESET_TOKEN: Joi.string().required(),
  JWT_EXPIRATION_TIME_PASSWORD_RESET_TOKEN: Joi.number().required(),
  JWT_SECRET_REFRESH_TOKEN: Joi.string().required(),
  JWT_EXPIRATION_TIME_REFRESH_TOKEN: Joi.number().required(),
  JWT_SECRET_AUTHENTICATION_TOKEN: Joi.string().required(),
  JWT_EXPIRATION_TIME_AUTHENTICATION_TOKEN: Joi.number().required(),
  CLIENT_URL: Joi.string().required(),
  // MAIL_INCOMING_USER: Joi.string().required(),
  // MAIL_INCOMING_PASS: Joi.string().required(),
  MAIL_DOMAIN: Joi.string().required(),
  MAIL_HOST: Joi.string().required(),
});
