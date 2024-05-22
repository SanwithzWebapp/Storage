function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Push Message Menu')
      .addItem('Send Push Message', 'pushMessage_formSheet')
      .addToUi();
}

var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("pushMessage").getRange("B1:B3").getValues().flat();
var [uid, accessToken, json] = data;

function pushMessage_formSheet() {
    UrlFetchApp.fetch("https://api.line.me/v2/bot/message/push", {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
        "payload": JSON.stringify({
            "to": uid,
            "messages": [{
                "type": "flex",
                "altText": "Push Message",
                "contents": JSON.parse(json)
            }]
        })
    });
}
