// src/app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { configService } from '../common/configs/config.service';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { RolesModule } from './roles/roles.module';
import { LeaveTypeModule } from './leave-type/leave-type.module';
import { ProblemModule } from './problem/problem.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LeaveModule } from './leave/leave.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserRoleModule } from './user-role/user-role.module';
import { TeamModule } from './team/team.module';
import { UserTeamModule } from './user_team/user_team.module';
import { ApiSpecService } from 'common/api-spec/api-spec.service';

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
    ProblemModule,
    CompanyModule,
    LeaveModule,
    AuthModule,
    UserRoleModule,
    TeamModule,
    UserTeamModule,
  ],
  providers: [AppService, ApiSpecService],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
