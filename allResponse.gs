var CHANNEL_ACCESS_TOKEN = accessToken;
function doPost(e) {
    var data = JSON.parse(e.postData.contents);
    var replyToken = data.events[0].replyToken;
    var userMessage = data.events[0].message.type === 'text' ? data.events[0].message.text : '';
    var userId = data.events[0].source.userId;


  if (userMessage.toLowerCase() === 'text') {
    replyTextMessage(replyToken, "HELLO WORLD");
  } else if (userMessage.toLowerCase() === 'image') {
    replyImageMessage(replyToken, "https://raw.githubusercontent.com/sanwithz/storage/main/Rich_menu_2025/Rich%20menu%20Designer.png");
  } else if (userMessage.toLowerCase() === 'video') {
    replyVideoMessage(replyToken, "https://raw.githubusercontent.com/sanwithz/storage/mainmain/FILE/Transportation%20in%20Plants.mp4", 
    "https://raw.githubusercontent.com/sanwithz/storage/main/Rich_menu_2025/Rich%20menu%20Designer.png");
  } else if (userMessage.toLowerCase() === 'audio' |'audio ' ) {
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



const flexTest =  {"type":"bubble","body":{"type":"box","layout":"vertical","contents":[{"type":"text","text":"Flex Message","weight":"bold","color":"#1DB446","size":"sm"},{"type":"text","text":"Hello World!","weight":"bold","size":"xxl","margin":"md"},{"type":"box","layout":"horizontal","margin":"md","contents":[{"type":"text","text":"I am flex message bro!","size":"xs","color":"#aaaaaa","flex":4,"weight":"bold"}]}]},"styles":{"footer":{"separator":true}}}



// FLEX
function replyFlexMessage(replyToken, flexTest) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
  };
  var postData = {
    "replyToken": replyToken,
    "messages": [
      {
        "type": "flex",
        "altText": "Menu",
        "contents": flexTest
      }
    ]
  };
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData)
  };

  UrlFetchApp.fetch(url, options);
}


// TEXT
function replyTextMessage(replyToken, text) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
  };
  var postData = {
    "replyToken": replyToken,
    "messages": [
      {
        "type": "text",
        "text": text
      }
    ]
  };
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData)
  };

  UrlFetchApp.fetch(url, options);
}


// IMAGE
function replyImageMessage(replyToken, imageUrl) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
  };
  var postData = {
    "replyToken": replyToken,
    "messages": [
      {
        "type": "image",
        "originalContentUrl": imageUrl,
        "previewImageUrl": imageUrl
      }
    ]
  };
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData)
  };

  UrlFetchApp.fetch(url, options);
}




//VIDEO
function replyVideoMessage(replyToken, videoUrl, previewImageUrl) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
  };
  var postData = {
    "replyToken": replyToken,
    "messages": [
      {
        "type": "video",
        "originalContentUrl": videoUrl,
        "previewImageUrl": previewImageUrl
      }
    ]
  };
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData)
  };

  UrlFetchApp.fetch(url, options);
}





// AUDIO
function replyAudioMessage(replyToken, audioUrl, duration) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
  };
  var postData = {
    "replyToken": replyToken,
    "messages": [
      {
        "type": "audio",
        "originalContentUrl": audioUrl,
        "duration": duration
      }
    ]
  };
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData)
  };

  UrlFetchApp.fetch(url, options);
}





// LOCATION
function replyLocationMessage(replyToken, title, address, latitude, longitude) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
  };
  var postData = {
    "replyToken": replyToken,
    "messages": [
      {
        "type": "location",
        "title": title,
        "address": address,
        "latitude": latitude,
        "longitude": longitude
      }
    ]
  };
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData)
  };

  UrlFetchApp.fetch(url, options);
}




// STICKER
function replyStickerMessage(replyToken, packageId, stickerId) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
  };
  var postData = {
    "replyToken": replyToken,
    "messages": [
      {
        "type": "sticker",
        "packageId": packageId,
        "stickerId": stickerId
      }
    ]
  };
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData)
  };

  UrlFetchApp.fetch(url, options);
}




