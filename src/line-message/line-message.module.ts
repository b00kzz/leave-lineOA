import { Module } from '@nestjs/common';
import { LineMessageService } from './line-message.service';
import { LineMessageController } from './line-message.controller';

@Module({
  controllers: [LineMessageController],
  providers: [LineMessageService],
})
export class LineMessageModule {}
