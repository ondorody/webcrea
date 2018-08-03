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
            if (text === 'Duffy' || text === 'duffy' || text === 'dufy' || text === 'Dufy' || text === 'DUFFY' || text === 'Geolocalisation' || text === 'help' || text === 'Help' || text === 'Home') {
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
                        "url": "https://youtu.be/bRnpIwH6QaY",
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
                        "url": "https://youtu.be/bRnpIwH6QaY",
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
                        "url": "https://youtu.be/bRnpIwH6QaY",
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
					"title": "Duffy Home",
					"subtitle": "Picture of the place",
					"image_url": "https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_960_720.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "https://www.facebook.com/geombyan/",
						"title": "Help"
					}, {
						"type": "postback",
						"title": "Read SMS",
						"payload": "Ok. When you're at Coris Bank drive straight ahead until you see a bar called maquitos on your left there you beep me. ECOBANK is 10 minutes from home in fact. (Duffy)",
					}],
				}, {
					"title": "Reference",
					"subtitle": "Remarkable identity",
					"image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRovUUmxhO4cxDuoEbDCYmXN99StsE4wmQ8DxdC0TR9ZFVkG5Qm",
					"buttons": [{
						"type": "postback",
						"title": "Guide Message",
						"payload": "Ok. When you're at Coris Bank drive straight ahead until you see a bar called maquitos on your left there you beep me. The bank Coris is 10 minutes from home in fact. (Duffy)",
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

