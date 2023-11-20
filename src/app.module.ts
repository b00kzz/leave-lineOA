// src/app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { configService } from './config/config.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RolesModule } from './roles/roles.module';
import { LeaveTypeModule } from './leave-type/leave-type.module';
import { UserdetailModule } from './userdetail/userdetail.module';
import { ProblemModule } from './problem/problem.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LeaveModule } from './leave/leave.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
      {
        name: 'STRING_SERVICE',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
    ]),
    UserModule,
    RolesModule,
    LeaveTypeModule,
    LeaveModule,
    UserdetailModule,
    ProblemModule,
    CompanyModule,
    LeaveModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
