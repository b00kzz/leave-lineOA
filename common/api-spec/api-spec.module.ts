import { Global, Module } from '@nestjs/common';
import { ApiSpecService } from './api-spec.service';

@Global()
@Module({
  providers: [ApiSpecService],
  exports: [ApiSpecService],
})
export class ApiSpecModule {}
