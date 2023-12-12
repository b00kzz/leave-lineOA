import { Controller, Post, Body } from '@nestjs/common';
import { LineMessageService } from './line-message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('line-bot')
export class LineMessageController {
  constructor(private readonly lineMessageService: LineMessageService) { }

  @Post('webhook')
  async handleWebhook(@Body() body: any): Promise<any> {
    try {
      const result = await this.lineMessageService.handleWebhook(body);
      return result;
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ status: 'error' }),
      };
    }
  }

  @Post('send-message-to-api')
  async sendMessageToApi(@Body() createMessageDto: CreateMessageDto): Promise<any> {
    // ส่งข้อความไปยัง API ต่อไปนี้
    const apiResult = await this.lineMessageService.sendMessageToApi(createMessageDto.text);
    return apiResult;
  }
}
