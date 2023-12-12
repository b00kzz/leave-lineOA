import { Client, WebhookEvent, ClientConfig, TextEventMessage, FlexMessage } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { flexMessage } from './flexDto/flex-dto';
import axios from 'axios';

@Injectable()
export class LineMessageService {
    private client: Client;

    constructor(private readonly configService: ConfigService) {
        const config: ClientConfig = {
            channelAccessToken: this.configService.get<string>('LINE_CHANNEL_ACCESS_TOKEN'),
            channelSecret: this.configService.get<string>('LINE_CHANNEL_SECRET'),
        };

        this.client = new Client(config);
    }

    async handleWebhook(body: { events: WebhookEvent[] }): Promise<any> {
        const events: WebhookEvent[] = body.events;

        const promises = events.map(async (event: WebhookEvent) => {
            try {
                if (event.type === 'message' && event.message.type === 'text') {
                    const textEventMessage = event.message as TextEventMessage;

                    if (textEventMessage.text.toLowerCase() === 'สวัสดี') {
                        const replyText = 'สวัสดีคร้าบบ';
                        await this.client.replyMessage(event.replyToken, [{
                            type: 'text',
                            text: replyText,
                        },
                        {
                            type: 'sticker',
                            packageId: '789',
                            stickerId: '10856',
                        }]);
                    }
                    if (textEventMessage.text.toLowerCase() === '555') {
                        await this.client.replyMessage(event.replyToken, flexMessage);
                    }
                }
            } catch (err) {
                console.error(err);
                // Consider logging errors in a more structured way or sending notifications
            }
        });

        await Promise.all(promises);

        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'success' }),
        };
    }

    async sendMessageToApi(text: string): Promise<any> {
        // ส่งข้อความไปยัง API ต่อไปนี้
        const apiUrl = 'YOUR_API_URL';
        try {
            const response = await axios.post(apiUrl, { text });
            return response.data;
        } catch (error) {
            console.error(error);
            // ดักจับข้อผิดพลาดและจัดการตามที่คุณต้องการ
            throw new Error('Failed to send message to API');
        }
    }
}
