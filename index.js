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
            if (text === 'Menu' || text === 'Demarrer' || text === 'Bank' || text === 'GAB') {
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
            if (text === 'News' || text === 'Start' || text === 'Infos' || text === 'Nouveau') {
                sendGenericMessaoge(sender)
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

var token = "EAAR7rXLj81wBAEJmS62ZBE5stLHoeU0utxZAPnINOtXINLk6y2qvPprPSr24PYky5295bsNezPMIvF8xVIlGPQ0ZACQhiAbKt6MlzUZBoiZAE18bZBagDjzfXfZCPuv5Gylaaxzmp4MDm4wjdWRnupkcfqTjfh35AwKZA785ERJfVAZDZD"

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
                    "title": "GAB disponible",
                    "subtitle": "Consultez",
                    "image_url": "https://res.cloudinary.com/hogfzgl4g/image/upload/v1531427846/qrcode_piece_perdu.png",
              "buttons": [{
                        "type": "web_url",
                        "url": "https://res.cloudinary.com/hogfzgl4g/image/upload/v1531427846/qrcode_piece_perdu.png",
                        "title": "VISA"

                    }, {
                        "type": "web_url",
                        "url": "https://www.google.bf/search?rlz=1C1NHXL_frBF779BF779&biw=1600&bih=794&q=GAB+UBA&npsic=0&rflfq=1&rlha=0&rllag=12349389,-1513259,1458&tbm=lcl&ved=0ahUKEwjsqdSW-d7ZAhVLq1kKHYr_Ah8QjGoITQ&tbs=lrf:!2m4!1e17!4m2!17m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:3&rldoc=1#rlfi=hd:;si:;mv:!1m3!1d20055.420460186306!2d-1.5111939!3d12.355461900000002!2m3!1f0!2f0!3f0!3m2!1i348!2i494!4f13.1;tbs:lrf:!2m1!1e3!2m4!1e17!4m2!17m1!1e2!3sIAE,lf:1,lf_ui:3",
                        "title": "Master Card"
                    }, {
                        "type": "web_url",
                        "url": "https://www.google.bf/search?rlz=1C1NHXL_frBF779BF779&biw=1600&bih=794&q=GAB+ECOBANK&npsic=0&rflfq=1&rlha=0&rllag=12362415,-1481037,1731&tbm=lcl&ved=0ahUKEwiYq7PA-d7ZAhUuwlkKHcxNCRUQjGoITg&tbs=lrf:!2m4!1e17!4m2!17m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:4&rldoc=1#rlfi=hd:;si:;mv:!1m3!1d23222.20425482326!2d-1.4940682!3d12.353902249999999!2m3!1f0!2f0!3f0!3m2!1i289!2i286!4f13.1;tbs:lrf:!2m1!1e3!2m4!1e17!4m2!17m1!1e2!3sIAE,lf:1,lf_ui:4",
                        "title": "American Express"
                    }],
                }, {
                    "title": "Reservez un ticket",
                    "subtitle": "Choisir sa banque",
                    "image_url": "https://res.cloudinary.com/hogfzgl4g/image/upload/c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1531427846/qrcode_piece_perdu.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Coris Bank",
                        "payload": "Ticket N°1",
                    }, {
                        "type": "postback",
                        "title": "UBA",
                        "payload": "Ticket N°2",
                    }, {
                        "type": "postback",
                        "title": "Ecobank",
                        "payload": "Ticket N°3",
                    }],
                }, {
                    "title": "Produits Bancaire ",
                    "subtitle": " Bon Plan ",
                    "image_url": "https://cdn.pixabay.com/photo/2015/11/23/10/52/ec-1058106_960_720.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://anfo44.files.wordpress.com/2017/01/bourse-logement-pour-2013-2014-l-gpi-w600h450zc1.jpg",
                        "title": "Etudiant",

                    }, {
                        "type": "web_url",
                        "url": "https://www.boursedescredits.com/pics/data/guides/images/924-650x320.jpg",
                        "title": " Actif",
                    }, {
                        "type": "web_url",
                        "url": "https://www.sicavonline.fr/images/news/536553_1.jpg ",
                        "title": "Retraité",
                    }],

                }, {
                    "title": "Faso Bank",
                    "subtitle": "Comparateur de prix",
                    "image_url": "https://choisir-sa-banque-en-ligne.info/wp-content/uploads/2016/10/Capture-d%E2%80%99e%CC%81cran-2016-10-29-a%CC%80-15.13.22-285x300.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Ouverture de compte courant ",
                        "payload": "Compte courant: Coris Bank: 10.000 fcfa---SGBF: Gratuit---UBA: 10.000fcfa ",
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
                    "title": "QR CODE MBYAN",
                    "subtitle": "Flas infos",
                    "image_url": "https://qrackajack.expeditedaddons.com/?api_key=4956C3FYQSJB6PO70V9D0UA8785GHW34MKTR21NEZX2LI1&content=http://pieceperdue.net&width=256&height=256&fg_color=#000000&bg_color=#ffffff', function (error, response, body)",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.facebook.com/MBYAN-2057178064536577/",
                        "title": "Geolocalisation par Qr Code"
                    }, {
                        "type": "postback",
                        "title": "A la une ",
                        "payload": "Opengab créé la BlueMoney",
                    }],
                }, {
                    "title": "News 2",
                    "subtitle": "Que vos ma banque ?  ",
                    "image_url": "https://www.les-crises.fr/wp-content/uploads/2013/03/21-composition-systeme-bancaire-fr.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Réponse",
                        "payload": "Voir l'image",
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
