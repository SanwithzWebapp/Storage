function sendFlexMessage(replyToken, userId, amount) {
  // Start Loading Animation
  var loadingOptions = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
    },
    'payload': JSON.stringify({
      'chatId': userId,
      'loadingSeconds': 5  // Adjust the time as needed
    })
  };

  UrlFetchApp.fetch('https://api.line.me/v2/bot/chat/loading/start', loadingOptions);

  // Flex message content
  var flexContent = {
 
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "🙏 ขอบคุณที่สนับสนุนครับ",
        "weight": "bold",
        "size": "xl",
        "margin": "lg"
      },
      {
        "type": "separator",
        "margin": "xxl"
      },
      {
        "type": "box",
        "layout": "vertical",
        "margin": "xxl",
        "spacing": "sm",
        "contents": [
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "ชื่อบัญชี :",
                "size": "sm",
                "color": "#555555",
                "flex": 0,
                "weight": "bold"
              },
              {
                "type": "text",
                "text": "นายสิทธิชาติ สิทธิ",
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "เลขที่บัญชี :",
                "size": "sm",
                "color": "#555555",
                "flex": 0,
                "weight": "bold"
              },
              {
                "type": "text",
                "text": "9801729317",
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
            ]
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "ยอดรวมสุทธิ",
                "weight": "bold",
                "size": "lg"
              },
              {
                "type": "text",
                "text": `${amount} บาท`,
                "weight": "bold",
                "size": "xxl",
                "margin": "md"
              }
            ],
            "flex": 2
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "พร้อมเพย์",
                "offsetStart": "xxl",
                "size": "xxs"
              },
              {
                "type": "image",
                "url": `https://promptpay.io/0836712486/${amount}.png`,
                "size": "md",
                "aspectRatio": "1:1"
              }
            ],
            "flex": 1
          }
        ],
        "margin": "md"
      }
    ],
    "margin": "none"
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      {
        "type": "button",
        "height": "sm",
        "action": {
          "type": "uri",
          "label": "#สื่อและนวัตกรรมครูสิทธิชาติ",
          "uri": "https://sanwithz.com"
        }
      }
    ]
  },
  "styles": {
    "footer": {
      "separator": true
    }
  }
}

  var messageOptions = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
    },
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        "type": "flex",
        "altText": "Flex Message with PromptPay",
        "contents": flexContent
      }]
    })
  };

  // Send the actual flex message
  var response = UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', messageOptions);
  Logger.log(response);

}
