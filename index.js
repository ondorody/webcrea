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
                    "title": "SUBSCRIBE",
                    "subtitle": "SUBSCRIBE",
                    "image_url": "https://cdn.pixabay.com/photo/2015/09/19/17/02/map-947471_960_720.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://mbyan.heroku.com/",
                        "title": "SUBSCRIBE"

                    }, {
                        "type": "web_url",
                        "url": "https://mbyan.heroku.com/",
                        "title": "SUBSCRIBE"
                    }, {
                        "type": "web_url",
                        "url": "https://mbyan.heroku.com/",
                        "title": "SUBSCRIBE"
                    }],
                }, {
                    "title": "SUBSCRIBE",
                    "subtitle": "SUBSCRIBE",
                    "image_url": "https://cdn.pixabay.com/photo/2015/09/19/17/02/map-947471_960_720.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "SUBSCRIBE",
                        "payload": "SUBSCRIBE",
                    }, {
                        "type": "postback",
                        "title": "SUBSCRIBE",
                        "payload": "SUBSCRIBE",
                    }, {
                        "type": "postback",
                        "title": "SUBSCRIBE",
                        "payload": "SUBSCRIBE",
                    }],
                }, {
                    "title": "SUBSCRIBE",
                    "subtitle": "SUBSCRIBE",
                    "image_url": "https://cdn.pixabay.com/photo/2015/09/19/17/02/map-947471_960_720.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://mbyan.heroku.com/",
                        "title": "SUBSCRIBE",

                    }, {
                        "type": "web_url",
                        "url": "https://mbyan.heroku.com/",
                        "title": "SUBSCRIBE",
                    }, {
                        "type": "web_url",
                        "url": "https://mbyan.heroku.com/",
                        "title": "SUBSCRIBE",
                    }],

                }, {
                    "title": "SUBSCRIBE",
                    "subtitle": "SUBSCRIBE",
                    "image_url": "https://cdn.pixabay.com/photo/2015/09/19/17/02/map-947471_960_720.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "SUBSCRIBE",
                        "payload": "SUBSCRIBE",
                    }, {
                        "type": "postback",
                        "title": "SUBSCRIBE",
                        "payload": "SUBSCRIBE",
                        }, {
                            "type": "postback",
                            "title": "SUBSCRIBE",
                            "payload": "SUBSCRIBE",
                   
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

function sendGenericMessaoge(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "ADD PICTURES",
                    "subtitle": "ADD PICTURES",
                    "image_url": "https://cdn.pixabay.com/photo/2015/09/19/17/02/map-947471_960_720.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.facebook.com/groups/248598409284666/",
                        "title": "Visit the Group"
                    }, {
                        "type": "postback",
                        "title": "ADD PICTURES",
                        "payload": "ADD PICTURES",
                    }],
                }, {
                    "title": "ADD PICTURES",
                    "subtitle": "ADD PICTURES",
                    "image_url": "https://cdn.pixabay.com/photo/2015/09/19/17/02/map-947471_960_720.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "ADD PICTURES",
                        "payload": "ADD PICTURES",
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
