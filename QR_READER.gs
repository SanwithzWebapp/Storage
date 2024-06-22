function doGet(e) {
  return HtmlService.createTemplateFromFile("index").evaluate()
    .setTitle("QR CODE App")
    .setFaviconUrl('https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/121-css3-512.png')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function saveData(code) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Attendance");
  var date = new Date(); // Get the current date
  sheet.appendRow([date, code]); // Append the date and code to the sheet
  pushMessage()
  return { res: "บันทึกสำเร็จ" };
}


// Flex Message 
function pushMessage() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Attendance");
  var data = sheet.getDataRange().getValues();
  var lastRow = data[data.length - 1]; // Get the last row added
  Logger.log(lastRow);
  

  var today = lastRow[0].toLocaleDateString();
  var time = lastRow[0].toLocaleTimeString();
  var uid = lastRow[1];
  var number = lastRow[2]
  var name = lastRow[3];
  var classroom = lastRow[4];


  var line_access_token = 'XXXXXX';

  var flexContent = {
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "ลงเวลารียบร้อย",
          "weight": "bold",
          "color": "#1DB446",
          "size": "md"
        },
        {
          "type": "text",
          "text": name,
          "weight": "bold",
          "size": "xl",
          "margin": "md"
        },
        {
          "type": "text",
          "text": "รหัสนักเรียน : "+number,
          "size": "md",
          "color": "#aaaaaa",
          "wrap": true
        },
        {
          "type": "text",
          "text": "ห้อง : "+classroom,
          "size": "md",
          "color": "#aaaaaa",
          "wrap": true
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
                  "text": "วันที่",
                  "size": "md",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": today,
                  "size": "md",
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
                  "text": "ลงเวลา",
                  "size": "md",
                  "color": "#555555",
                  "flex": 0,
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": time +" น.",
                  "size": "md",
                  "color": "#111111",
                  "align": "end"
                }
              ]
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": []
            }
          ]
        },
        {
          "type": "separator",
          "margin": "xxl"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "margin": "md",
          "contents": [
            {
              "type": "text",
              "text": "# สื่อและนวัตกรรมครูสิทธิชาติ",
              "size": "xs",
              "color": "#aaaaaa",
              "flex": 0,
              "align": "center"
            }
          ]
        }
      ]
    },
    "styles": {
      "footer": {
        "separator": true
      }
    }
  };

  var options = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + line_access_token,
    },
    'payload': JSON.stringify({
      'to': uid,
      'messages': [{
        "type": "flex",
        "altText": "Flex Message with Buttons",
        "contents": flexContent
      }]
    }),
  };

  var response = UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', options);
  Logger.log(response);
}
