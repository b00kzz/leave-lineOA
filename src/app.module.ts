// src/app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { configService } from '../common/configs/config.service';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { RolesModule } from './roles/roles.module';
import { LeaveTypeModule } from './leave-type/leave-type.module';
import { ProblemModule } from './problem/problem.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserRoleModule } from './user-role/user-role.module';
import { TeamModule } from './team/team.module';
import { UserTeamModule } from './user_team/user_team.module';
import { ApiSpecService } from 'common/api-spec/api-spec.service';
import { LineMessageModule } from './line-message/line-message.module';
import { HolidayModule } from './holiday/holiday.module';
import { UserTimeOffModule } from './user-time-off/user-time-off.module';
import { LeaveRequestsModule } from './leave-requests/leave-requests.module';
import { PositionModule } from './position/position.module';
import { CalendarModule } from './calendar/calendar.module';

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
    ProblemModule,
    AuthModule,
    UserRoleModule,
    TeamModule,
    UserTeamModule,
    LineMessageModule,
    HolidayModule,
    UserTimeOffModule,
    LeaveRequestsModule,
    PositionModule,
    CalendarModule,
  ],
  providers: [AppService, ApiSpecService],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
