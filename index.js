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
            if (text === 'hello' || text === 'Demarrer' || text === 'Hello' || text === 'hi' || text === 'Hi' || text === 'qrcode' || text === 'menu' || text === 'MENU' || text === 'Menu' || text === 'start' || text === 'Start' || text === 'mbyan' || text === 'MBYAN' || text === 'Mbyan') {
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
            if (text === 'Bank Burkina' || text === 'UBA' || text === 'Coris Bank' || text === 'BOA' || text === 'SGBF' || text === 'Ecobank' || text === 'Banque Burkina Faso' || text === 'Banque faso' || text === 'Bank BF') {
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

var token = "EAAR7rXLj81wBAHq8C1zJoXQAwZBYEjreZCkSpwcBq60K8rAc3y4nqoeYwKHXsv03b01VktAmrDg77tmZBTcWHRosnwqZB7TSuEUiYSYhpj8764SdunWOkglqvSl11yrVZC08ergJrpn5N7wQeHeUM8GIAgwTG0yq5FkVcIlVBxQZDZD"

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


// Carte des GAB en focntion des type de carte de credit

function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "My home ?",
                    "subtitle": "Picture of the place",
                    "image_url": "https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_960_720.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_960_720.jpg",
                        "title": "See"

                    }, {
                        "type": "web_url",
                        "url": "https://cdn.pixabay.com/photo/2016/09/03/11/45/abandoned-1641489_960_720.jpg",
                        "title": "remarkable identity "
                    }, {
                        "type": "web_url",
                        "url": "https://cdn.pixabay.com/photo/2016/11/19/00/12/wave-1837426_960_720.png",
                        "title": "Audio indication"

                    }],
                }, {
                    "title": "Reference  ",
                    "subtitle": "remarkable identity",
                    "image_url": "https://cdn.pixabay.com/photo/2016/09/03/11/45/abandoned-1641489_960_720.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://cdn.pixabay.com/photo/2016/09/03/11/45/abandoned-1641489_960_720.jpg",
                        "title": "See"

                    }, {
                        "type": "web_url",
                        "url": "https://thumb1.shutterstock.com/display_pic_with_logo/1472795/354109316/stock-photo-ouagadougou-pinned-on-a-map-of-africa-354109316.jpg",
                        "title": "Maps"
                    }, {
                        "type": "web_url",
                        "url": "https://cdn.pixabay.com/photo/2016/11/19/00/12/wave-1837426_960_720.png",
                        "title": "Audio indication"

                    }],
                }, {

                    "title": "Maps ",
                    "subtitle": "Location",
                    "image_url": "https://thumb1.shutterstock.com/display_pic_with_logo/1472795/354109316/stock-photo-ouagadougou-pinned-on-a-map-of-africa-354109316.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.google.com/maps/place/Ouagadougou/data=!4m2!3m1!1s0xe2e95ecceaa44cd:0x799f67799c743b8b?sa=X&ved=2ahUKEwiTy6qkmMzcAhUHKBoKHZmABp4Q8gEwAHoECAQQAQ",
                        "title": "See"
                        
                        }, {
                        "type": "web_url",
                        "url": "https://cdn.pixabay.com/photo/2016/11/19/00/12/wave-1837426_960_720.png",
                        "title": "Audio indication"
                    }, {
                        "type": "web_url",
                        "url": "https://form.myjotform.com/81984719024565",
                        "title": "Generate a qr code"

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

// reseau des Bank du Burkina Faso

function sendGenericMessaoge(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Vous cherchez une Bank ?",
                    "subtitle": "Reseau des Bank du Burkina",
                    "image_url": "https://i1.wp.com/netafrique.net/wp-content/uploads/2016/02/banques.jpg?resize=640%2C358",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.ecobank.com/bf/personal-banking",
                        "title": "Ecobank"

                    }, {
                        "type": "web_url",
                        "url": "http://www.coris-bank.com/",
                        "title": "Coris Bank "
                    }, {
                        "type": "web_url",
                        "url": "https://www.boaburkinafaso.com/",
                        "title": "BANK OF AFRICA"

                    }],
                }, {
                    "title": "Explorez les Bank du Faso ",
                    "subtitle": "Reseau des Bank du Burkina",
                    "image_url": "https://www.lespharaons.com/wp-content/uploads/2017/09/cfa-2-1.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://societegenerale.bf/fr/",
                        "title": "SGBF"

                    }, {
                        "type": "web_url",
                        "url": "http://www.bsicbank.com/burkina/",
                        "title": "BSIC"
                    }, {
                        "type": "web_url",
                        "url": "https://www.ubagroup.com/countries/bf",
                        "title": "UBA"

                    }],
                }, {

                    "title": "Encore plus de Bank  ",
                    "subtitle": "Reseau des Bank du Burkina",
                    "image_url": "http://www.planetecampus.com/wp-content/uploads/2017/04/cfa.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.banqueatlantique.net/bf/",
                        "title": "Banque Atlantique"
                    }, {
                        "type": "web_url",
                        "url": "https://www.cbao.sn/fr/succursales-filiales",
                        "title": "CBAO"
                    }, {
                        "type": "web_url",
                        "url": "http://www.bdu-bf.com/",
                        "title": "BDU-BF"

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
}


        





// text pour message d'accueil 



//=========================================================
// Facebook setup // Run only when need updating.
//=========================================================



// Calls the Facebook graph api to change various bot settings
function facebookThreadAPI(jsonFile, cmd) {
   
    // Set FB bot greeting text
    facebookThreadAPI('./fb-greeting-text.json', 'Greeting Text');
    // Set FB bot get started button
    facebookThreadAPI('./fb-get-started-button.json', 'Get Started Button');
    // Set FB bot persistent menu
    facebookThreadAPI('./fb-persistent-menu.json', 'Persistent Menu');
    // Start the request
    var request = require('request');
    request({
        url: 'https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAAR7rXLj81wBAEJmS62ZBE5stLHoeU0utxZAPnINOtXINLk6y2qvPprPSr24PYky5295bsNezPMIvF8xVIlGPQ0ZACQhiAbKt6MlzUZBoiZAE18bZBagDjzfXfZCPuv5Gylaaxzmp4MDm4wjdWRnupkcfqTjfh35AwKZA785ERJfVAZDZD'+process.env.FB_PAGE_ACCESS_TOKEN,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        form: require(jsonFile)
    },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(cmd + ": Updated.");
                console.log(body);
            } else {
                // TODO: Handle errors
                console.log(cmd + ": Failed. Need to handle errors.");
                console.log(body);
            }
        });
}

