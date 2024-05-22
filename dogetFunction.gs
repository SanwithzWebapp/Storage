var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Text_Input");

function doPost(e) {
    var data = JSON.parse(e.postData.contents);
    var replyToken = data.events[0].replyToken;
    var userMessage = data.events[0].message.type === 'text' ? data.events[0].message.text : '';
    var userId = data.events[0].source.userId;

    // Save data to Google Sheet
    appendToSheet(userId, userMessage);

    if (userMessage.toLowerCase() === 'text') {
        replyTextMessage(replyToken, "HELLO WORLD");
    } else if (userMessage.startsWith("QRcode,")) {
        var amount = userMessage.split(',')[1];
        sendFlexMessage(replyToken, userId, amount);
    } else if (userMessage.toLowerCase() === 'image') {
        replyImageMessage(replyToken, "https://raw.githubusercontent.com/sanwithz/storage/main/Rich_menu_2025/Rich%20menu%20Designer.png");
    } else if (userMessage.toLowerCase() === 'video') {
        replyVideoMessage(replyToken, "https://raw.githubusercontent.com/sanwithz/storage/mainmain/FILE/Transportation%20in%20Plants.mp4", "https://raw.githubusercontent.com/sanwithz/storage/main/Rich_menu_2025/Rich%20menu%20Designer.png");
    } else if (userMessage.toLowerCase() === 'audio') {
        replyAudioMessage(replyToken, "https://raw.githubusercontent.com/sanwithz/storage/main/FILE/TheFatRat%20%26%20Cecilia%20Gault%20-%20Escaping%20Gravity%20%5BChapter%20Three%5D.m4a", 60000);
    } else if (userMessage.toLowerCase() === 'location') {
        replyLocationMessage(replyToken, "My Location", "1234 Main St, Anytown, USA", 37.7749, -122.4194);
    } else if (userMessage.toLowerCase() === 'sticker') {
        replyStickerMessage(replyToken, "1", "1");
    } else if (userMessage.toLowerCase() === 'flex') {
        replyFlexMessage(replyToken, flexTest);
    } else {
        replyTextMessage(replyToken, "No Webhook for this Keyword");
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
}

function appendToSheet(userId, message) {
    var currentTime = new Date();
    sheet.appendRow([currentTime, userId, message]);
}
