// El Mehdi LAIDOUNI

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Bonjour, Je suis votre Facebook Messenger Bot')
})

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'Bot_Messenger_App') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})


// End Point

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            if (text === 'Hello' || text === 'Hi' || text === 'QRcode' || text === 'generate') {
                sendGenericMessage(sender)
                continue
            }
            sendTextMessage(sender, "Bot: " + text.substring(0, 200))
        }
        if (event.postback) {
            text = JSON.stringify(event.postback)
            sendTextMessage(sender, "Postback received: " + text.substring(0, 200), token)
            continue
        }
    }
    res.sendStatus(200)

    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            if (text === 'geo' || text === 'Ouagadougou' || text === 'registration' || text === 'form') {
                generateHtmlResponse(sender)
                continue
            }
            sendTextMessage(sender, "Bot: " + text.substring(0, 200))
        }
        if (event.postback) {
            text = JSON.stringify(event.postback)
            sendTextMessage(sender, "Postback received: " + text.substring(0, 200), token)
            continue
        }
    }
    res.sendStatus(200)
})

var token = "EAAR7rXLj81wBAJ99zHQTjUiprkvtoWH4gyz9NeN6mpXC11x5FhmaZB4uquDk3DfCGvGbcVoWwlhM1da6Ws8nqxZBrxeriPBuCPkvvPWpgpqp3hprNBudRZAMdZBTXLBfFVGsMjG5gU1XWnOas4LNxGO0ZAqSymdXangRlg5tbCfaN8eDFMbnd"

// Echo back messages

function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


// Two cards.

function sendGenericMessage(sender) {
   let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "QR CODE Available",
                    "subtitle": "See",
                    "image_url": "https://qrackajack.expeditedaddons.com/?api_key=4956C3FYQSJB6PO70V9D0UA8785GHW34MKTR21NEZX2LI1&content=http://geolocbyqrcode.yo.fr/blog/2018/07/02/mbyan-de-luc&width=256&height=256&fg_color=#000000&bg_color=#ffffff",
              "buttons": [{
                        "type": "web_url",
                        "url": "https://www.boursedescredits.com/pics/data/guides/images/924-650x320.jpg",
                        "title": "School of Vilage",

                    }, {
                        "type": "web_url",
                        "url": "https://www.boursedescredits.com/pics/data/guides/images/924-650x320.jpg",
                    }, {
                        "type": "web_url",
                        "url": "https://www.boursedescredits.com/pics/data/guides/images/924-650x320.jpg",
                        "title": "My House",
                    }],
                }, {
                    "title": "QR CODE Available",
                    "subtitle": "scan",
                    "image_url": "https://qrackajack.expeditedaddons.com/?api_key=4956C3FYQSJB6PO70V9D0UA8785GHW34MKTR21NEZX2LI1&content=http://geolocbyqrcode.yo.fr/blog/2018/07/02/mbyan-de-luc&width=256&height=256&fg_color=#000000&bg_color=#ffffff",
                    "buttons": [{
                        "type": "postback",
                        "title": "text1",
                        "payload": "Text2",
                    }, {
                        "type": "postback",
                        "title": "Text3",
                        "payload": "Text4",
                    }, {
                        "type": "postback",
                        "title": "Text5",
                        "payload": "Text6",
                    }],
                }, {
                    "title": "QR CODE Available",
                    "subtitle": "scan more",
                    "image_url": "https://qrackajack.expeditedaddons.com/?api_key=4956C3FYQSJB6PO70V9D0UA8785GHW34MKTR21NEZX2LI1&content=http://geolocbyqrcode.yo.fr/blog/2018/07/02/mbyan-de-luc&width=256&height=256&fg_color=#000000&bg_color=#ffffff",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.boursedescredits.com/pics/data/guides/images/924-650x320.jpg",
                        "title": "Village",

                    }, {
                        "type": "web_url",
                        "url": "https://www.boursedescredits.com/pics/data/guides/images/924-650x320.jpg",
                        "title": "Forest",
                    }, {
                        "type": "web_url",
                        "url": "https://www.sicavonline.fr/images/news/536553_1.jpg",
                        "title": "Bad road",
                    }],

                }, {
                    "title": "QR CODE Available",
                    "subtitle": "scan",
                    "image_url": "https://qrackajack.expeditedaddons.com/?api_key=4956C3FYQSJB6PO70V9D0UA8785GHW34MKTR21NEZX2LI1&content=http://geolocbyqrcode.yo.fr/blog/2018/07/02/mbyan-de-luc&width=256&height=256&fg_color=#000000&bg_color=#ffffff",
                    "buttons": [{
                        "type": "postback",
                        "title": "Ouverture de compte courant",
                        "payload": "Compte courant: Coris Bank: 10.000 fcfa---SGBF: Gratuit---UBA: 10.000fcfa",
                    }, {
                        "type": "postback",
                        "title": "Taux d'interet",
                        "payload": "Coris Bank: A%--- SGBF: B%--- UBA: C%",
                        }, {
                            "type": "postback",
                            "title": "Prérequis  d'ouverture d'un compte bancaire",
                            "payload": "Coris Bank: A -- SGBF: B -- UBA: C",

                    }],
                }]
            }
        }      
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

var request = require('request');

request('https://iptoearth.expeditedaddons.com/?api_key=HTBCSM05UX6Q07389DL51JPN2FAVZ847EY3OR2G6WI1K94&ip=68.10.149.45', function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
});

var request = require('request');

request('https://qrackajack.expeditedaddons.com/?api_key=4956C3FYQSJB6PO70V9D0UA8785GHW34MKTR21NEZX2LI1&content=http://pieceperdue.net&width=256&height=256&fg_color=#000000&bg_color=#ffffff', function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});

var request = require('request');

request('https://qrackajack.expeditedaddons.com/?api_key=4956C3FYQSJB6PO70V9D0UA8785GHW34MKTR21NEZX2LI1&content=http://geolocbyqrcode.yo.fr&width=256&height=256&fg_color=#000000&bg_color=#ffffff', function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});

var request = require('request');

request('https://qrackajack.expeditedaddons.com/?api_key=4956C3FYQSJB6PO70V9D0UA8785GHW34MKTR21NEZX2LI1&content=http://geolocbyqrcode.yo.fr/blog/2018/07/02/mbyan-de-luc&width=256&height=256&fg_color=#000000&bg_color=#ffffff', function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});

var request = require('request');

request('https://webtopdf.expeditedaddons.com/?api_key=162I4VY35O8U38WRC0ME17N97Z6SDFX9KPBJTALH024Q5G&content=http://geolocbyqrcode.yo.fr/blog/2018/07/02/mbyan-de-luc/=My PDF Title', function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});

//zone test 


function sendTextMessaoge(sender, text) {
    let messageData = { text: text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendGenericMessaoge(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Community",
                    "subtitle": "to integrate",
                    "image_url": "https://qrackajack.expeditedaddons.com/?api_key=4956C3FYQSJB6PO70V9D0UA8785GHW34MKTR21NEZX2LI1&content=http://pieceperdue.net&width=256&height=256&fg_color=#000000&bg_color=#ffffff', function (error, response, body)",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://web.facebook.com/groups/248598409284666/",
                        "title": "Geolocation by QR Code",
                    }, {
                        "type": "postback",
                        "title": "take a picture of a place",
                        "payload": "publish in the group",
                    }],
                }, {
                    "title": "FORM",
                    "subtitle": "Do you want to generate a QR Code for a place?",
                    "image_url": "https://qrackajack.expeditedaddons.com/?api_key=4956C3FYQSJB6PO70V9D0UA8785GHW34MKTR21NEZX2LI1&content=http://geolocbyqrcode.yo.fr/blog/2018/07/02/mbyan-de-luc&width=256&height=256&fg_color=#000000&bg_color=#ffffff",
                    "buttons": [{
                        "type": "postback",
                        "title": "Réponse",
                        "payload": "enter generate",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
    /* After you create an account at cloudinary.com, fill in the
 * values below with your credentials. */
var cloudinaryCredentials = {
  cloud_name: 'hogfzgl4g',
  api_key:    '336175118632385',
  api_secret: 'EE5Y3k47bO3L5AwUJ_DMRR-Bzyw'
};

///////////////////////////////////

var express    = require('express');
var cloudinary = require('cloudinary');
var expressHandlebars = require('express3-handlebars');
var bodyParser = require('body-parser')();
var fileParser = require('connect-multiparty')();
var port = Number(process.env.PORT || 5000);

cloudinary.config({
  cloud_name: cloudinaryCredentials.cloud_name,
  api_key:    cloudinaryCredentials.api_key,
  api_secret: cloudinaryCredentials.api_secret
});

var app = express();
app.engine('handlebars', expressHandlebars.create({
  defaultLayout: 'main'
}).engine);
app.set('view engine', 'handlebars');

app.use( bodyParser );

app.get('/', function(req, res){
  res.render('index');
});

app.post('/upload', fileParser, function(req, res){
  /* The `req.files` property will be populated because we
   * used the 'fileParser' middleware for this route.
   *
   * The 'name' attribute from the file input in your form will match the
   * property name on `req.files`.
   * So since we have <input type='file' name='image' /> in our form,
   * there is a `req.files.image` property available.
   */
  var imageFile = req.files.image;

  cloudinary.uploader.upload(imageFile.path, function(result){
    /*
     * After a successful upload, the callback's `result` argument
     * will be a hash (javascript object) with a property `url`
     * that you can use to display the uploaded image.
     * To learn more about the format of the `result` hash, see:
     *   http://cloudinary.com/documentation/node_image_upload
     */

    if (result.url) {
      /*
       * This would be a good spot to save this url (perhaps into a
       * mongo database) so that you can display it later.
       */
      res.render('upload', {url: result.url});
    } else {
      /*
       * There was an error and the file did not upload.
       */

      console.log('Error uploading to cloudinary: ',result);
      res.send('did not get url');
    }
  });
});

console.log('App started on port',port);
app.listen(port);
    
}
