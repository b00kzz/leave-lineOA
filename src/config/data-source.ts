import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'e_leave',
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  migrations: ['dist/src/db/migration/*.js'],
  synchronize: true,
};

const datasource = new DataSource(dataSourceOption);
export default datasource;
