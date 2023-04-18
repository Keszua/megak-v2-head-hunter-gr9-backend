import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { config } from './config';

export const ormConfig: MysqlConnectionOptions = {
	type: "mysql", 
	host: process.env.DB_HOST ?? config.dbHost, 
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : config.dbPort,
	username: process.env.DB_USERNAME ?? config.dbUser, 
	password: process.env.DB_PASSWORD ?? config.dbPassword, 
	database: config.dbDatabase,
	entities: [
	  'dist/**/*.entity{.ts,.js}',
	], 
	logging: config.ormLogging, 
	synchronize: config.ormSynchronize,
};