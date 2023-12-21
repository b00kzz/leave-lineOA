import { Injectable } from '@nestjs/common';
import { CalendarConfig } from 'common/configs/config-calendar';
import { google } from 'googleapis';

@Injectable()
export class CalendarService {
    private readonly calendar = google.calendar('v3');

    private readonly auth = new google.auth.GoogleAuth({
        credentials: CalendarConfig,
        scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    async findAll(): Promise<any> {
        try {
            const calendarId = 'th.th#holiday@group.v.calendar.google.com'; // แทนที่ด้วย calendarId ที่คุณต้องการ
            const authClient = await this.auth.getClient();
            const response = await this.calendar.events.list({
                auth: authClient as any,
                calendarId,
                timeMin: new Date().toISOString(),
                timeZone: 'Asia/Bangkok',
                singleEvents: true,
                orderBy: 'startTime',
                maxResults: 30,
            });
            if (response.data.items) {
                const items = await Promise.all(response.data.items.map(async (event) => {
                    const name = event.summary.toString();
                    if (event.start.date) {
                        const dayOfWeek = new Date(event.start.date).getDay();
                        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                            return {
                                name: name,
                                nameLocal: name,
                                date: event.start.date,
                                description: event.description,
                            };
                        }
                    }
                }));
                return items.filter(Boolean);
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async findByDate(date: Date): Promise<any> {
        try {
            const calendarId = 'th.th#holiday@group.v.calendar.google.com'; // แทนที่ด้วย calendarId ที่คุณต้องการ
            const authClient = await this.auth.getClient();
            const response = await this.calendar.events.list({
                auth: authClient as any,
                calendarId,
                timeMin: date.toISOString(),
                timeZone: 'Asia/Bangkok',
                singleEvents: true,
                orderBy: 'startTime',
                maxResults: 30,
            });
            if (response.data.items) {
                const items = await Promise.all(response.data.items.map(async (event) => {
                    const name = event.summary.toString();
                    if (event.start.date) {
                        const dayOfWeek = new Date(event.start.date).getDay();
                        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                            return {
                                name: name,
                                nameLocal: name,
                                date: event.start.date,
                                description: event.description,
                            };
                        }
                    }
                }));
                return items.filter(Boolean);
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    // async getHolidays(leaveDate: LeaveDateDto): Promise<any> {
    //     try {
    //         const calendarId = 'en.th#holiday@group.v.calendar.google.com'; // แทนที่ด้วย calendarId ที่คุณต้องการ
    //         const authClient = await this.auth.getClient();
    //         const start = new Date(leaveDate.startDate).toISOString();
    //         if (leaveDate.endDate) {
    //             const end = new Date(leaveDate.endDate).toISOString();
    //             const response = await this.calendar.events.list({
    //                 auth: authClient as any,
    //                 calendarId,
    //                 timeMin: start,
    //                 timeMax: end,
    //                 timeZone: 'Asia/Bangkok',
    //                 singleEvents: true,
    //                 orderBy: 'startTime',
    //                 maxResults: 5,
    //             });
    //             if (response.data.items) {
    //                 const items = await Promise.all(response.data.items.map(async (event) => {
    //                     const name = event.summary.toString();
    //                     if (event.start.date) {
    //                         return {
    //                             name: name,
    //                             nameLocal: "",
    //                             date: event.start.date,
    //                             description: event.description,
    //                         };
    //                     }
    //                 }));
    //                 return items.filter(Boolean);
    //             }
    //         } else {
    //             const response = await this.calendar.events.list({
    //                 auth: authClient as any,
    //                 calendarId,
    //                 timeMin: start,
    //                 timeZone: 'Asia/Bangkok',
    //                 singleEvents: true,
    //                 orderBy: 'startTime',
    //                 maxResults: 5,
    //             });
    //             if (response.data.items) {
    //                 const items = await Promise.all(response.data.items.map(async (event) => {
    //                     const name = event.summary.toString();
    //                     if (event.start.date) {
    //                         return {
    //                             name: name,
    //                             nameLocal: "",
    //                             date: event.start.date,
    //                             description: event.description,
    //                         };
    //                     }
    //                 }));
    //                 return items.filter(Boolean);
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error fetching events:', error.message);
    //         throw error;
    //     }
    // }

    // async differentDay(leaveDate: LeaveDateDto): Promise<number> {
    //     const start = new Date(leaveDate.startDate);
    //     if (leaveDate.endDate) {
    //         const end = new Date(leaveDate.endDate);
    //         const diffTime = Math.abs(end.getTime() - start.getTime());
    //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //         return diffDays;
    //     } else {
    //         return 1;  // ถ้าไม่มีวันสิ้นสุดจะมีวันที่เท่ากับ 0 วัน  เพราะวันที่สิ้นสุดจะไม่ต้องเป็นวันที่เริ่มต้น 
    //     }

    // }

}
