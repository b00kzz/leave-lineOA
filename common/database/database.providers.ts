import { DataSource } from 'typeorm';
import { configService } from 'common/configs/config.service';
import { DATA_SOURCE } from 'common/constants/data_source';

export const databaseProviders = [
  {
    provide: DATA_SOURCE.DEFAULT,
    useFactory: async () => {
      const dataSource = new DataSource(<any>configService.getTypeOrmConfig());

      return await dataSource.initialize();
    },
  },
];
