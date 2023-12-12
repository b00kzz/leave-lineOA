import { FlexMessage } from "@line/bot-sdk";

export const flexMessage = {
    "type": "flex",
    "altText": "สวัสดีครับ",
    "contents": {
        "type": "bubble",
        "hero": {
            "type": "image",
            "url": "https://example.com/bot/images/hello.jpg",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover"
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": "สวัสดีครับ",
                    "weight": "bold",
                    "size": "xl"
                }
            ]
        }
    }
} as FlexMessage;