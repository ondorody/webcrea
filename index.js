// El Mehdi LAIDOUNI

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 8000))

// Process urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

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

app.listen(app.get('port'), function () {
    console.log('running on port', app.get('port'))
})

app.get('/setup', function (req, res) {

    setupGetStartedButton(res);
    setupPersistentMenu(res);
    setupGreetingText(res);
});


// End Point

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            if (text === 'Mastercard' || text === 'Demarrer' || text === 'Visa' || text === 'GAB' || text === 'Bonjour' || text === 'Maestro' || text === 'American Express' || text === 'Discover Network' || text === 'Diners Club International' || text === 'AFFN' || text === 'Unionpay' || text === 'Hello' || text === 'VISA' || text === 'Gab') {
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


// Carte des GAB en focntion des type de carte de credit

function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Besoin d'argent ?",
                    "subtitle": "Reseau des GAB de ouaga",
                    "image_url": "http://1.bp.blogspot.com/-wjtqcLplXa4/TlDZCs4cOlI/AAAAAAAAOkI/oKT5l_gCBWI/s1600/2990649_130736059_2.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.google.bf/maps/place/Agence+ZAD+Soci%C3%A9t%C3%A9+G%C3%A9n%C3%A9rale/@12.336737,-1.500755,17z/data=!3m1!4b1!4m5!3m4!1s0xe2ebdddcfcdd687:0x878e97b4174b20ee!8m2!3d12.336737!4d-1.4985663",
                        "title": "VISA"

                    }, {
                        "type": "web_url",
                        "url": "https://www.google.bf/maps/place/Agence+ZAD+Soci%C3%A9t%C3%A9+G%C3%A9n%C3%A9rale/@12.336737,-1.500755,17z/data=!3m1!4b1!4m5!3m4!1s0xe2ebdddcfcdd687:0x878e97b4174b20ee!8m2!3d12.336737!4d-1.4985663",
                        "title": "Master Card "
                    }, {
                        "type": "web_url",
                        "url": "https://www.google.bf/maps/place/Agence+ZAD+Soci%C3%A9t%C3%A9+G%C3%A9n%C3%A9rale/@12.336737,-1.500755,17z/data=!3m1!4b1!4m5!3m4!1s0xe2ebdddcfcdd687:0x878e97b4174b20ee!8m2!3d12.336737!4d-1.4985663",
                        "title": "American Express"

                    }],
                }, {
                    "title": "Plus de Carte  ",
                    "subtitle": "Dispo 7/7",
                    "image_url": "https://i.ytimg.com/vi/Bs_PoK6vOno/maxresdefault_live.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.google.bf/maps/place/Agence+ZAD+Soci%C3%A9t%C3%A9+G%C3%A9n%C3%A9rale/@12.336737,-1.500755,17z/data=!3m1!4b1!4m5!3m4!1s0xe2ebdddcfcdd687:0x878e97b4174b20ee!8m2!3d12.336737!4d-1.4985663",
                        "title": "Diners Club International"

                    }, {
                        "type": "web_url",
                        "url": "https://www.google.bf/maps/place/Agence+ZAD+Soci%C3%A9t%C3%A9+G%C3%A9n%C3%A9rale/@12.336737,-1.500755,17z/data=!3m1!4b1!4m5!3m4!1s0xe2ebdddcfcdd687:0x878e97b4174b20ee!8m2!3d12.336737!4d-1.4985663",
                        "title": "Maestro"
                    }, {
                        "type": "web_url",
                        "url": "https://www.google.bf/maps/place/Agence+ZAD+Soci%C3%A9t%C3%A9+G%C3%A9n%C3%A9rale/@12.336737,-1.500755,17z/data=!3m1!4b1!4m5!3m4!1s0xe2ebdddcfcdd687:0x878e97b4174b20ee!8m2!3d12.336737!4d-1.4985663",
                        "title": "AFFN"

                    }],
                }, {

                    "title": "GAB ",
                    "subtitle": "Disponible 24h/24h",
                    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/1200px-UnionPay_logo.svg.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.google.bf/search?rlz=1C1NHXL_frBF779BF779&biw=1600&bih=794&q=GAB+CORIS+BANQUE&npsic=0&rflfq=1&rlha=0&rllag=12352601%2C-1505980%2C2159&tbm=lcl&ved=0ahUKEwjls837-N7ZAhUDwFkKHRFwDxgQjGoIWQ&tbs=lrf%3A%212m4%211e17%214m2%2117m1%211e2%212m1%211e3%213sIAE%2Clf%3A1%2Clf_ui%3A3&rldoc=1#rlfi=hd:;si:;mv:!1m3!1d20786.132230519084!2d-1.5254232!3d12.356123!2m3!1f0!2f0!3f0!3m2!1i599!2i256!4f13.1;tbs:lrf:!2m1!1e3!2m4!1e17!4m2!17m1!1e2!3sIAE,lf:1,lf_ui:3",
                        "title": "UnionPay"

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


  // teste mesage welcome


var mongoose = require("mongoose");

var db = mongoose.connect(process.env.MONGODB_URI);
var Movie = require("./models/movie");



// Server index page
app.get("/", function (req, res) {
    res.send("Deployed!");
});

// Facebook Webhook
// Used for verification
app.get("/webhook", function (req, res) {
    if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
        console.log("Verified webhook");
        res.status(200).send(req.query["hub.challenge"]);
    } else {
        console.error("Verification failed. The tokens do not match.");
        res.sendStatus(403);
    }
});

// All callbacks for Messenger will be POST-ed here
app.post("/webhook", function (req, res) {
    // Make sure this is a page subscription
    if (req.body.object == "page") {
        // Iterate over each entry
        // There may be multiple entries if batched
        req.body.entry.forEach(function (entry) {
            // Iterate over each messaging event
            entry.messaging.forEach(function (event) {
                if (event.postback) {
                    processPostback(event);
                } else if (event.message) {
                    processMessage(event);
                }
            });
        });

        res.sendStatus(200);
    }
});

function processPostback(event) {
    var senderId = event.sender.id;
    var payload = event.postback.payload;

    if (payload === "Greeting") {
        // Get user's first name from the User Profile API
        // and include it in the greeting
        request({
            url: "https://graph.facebook.com/v2.6/" + senderId,
            qs: {
                access_token: process.env.PAGE_ACCESS_TOKEN,
                fields: "first_name"
            },
            method: "GET"
        }, function (error, response, body) {
            var greeting = "";
            if (error) {
                console.log("Error getting user's name: " + error);
            } else {
                var bodyObj = JSON.parse(body);
                name = bodyObj.first_name;
                greeting = "Hi " + name + ". ";
            }
            var message = greeting + "My name is SP Movie Bot. I can tell you various details regarding movies. What movie would you like to know about?";
            sendMessage(senderId, { text: message });
        });
    } else if (payload === "Correct") {
        sendMessage(senderId, { text: "Awesome! What would you like to find out? Enter 'plot', 'date', 'runtime', 'director', 'cast' or 'rating' for the various details." });
    } else if (payload === "Incorrect") {
        sendMessage(senderId, { text: "Oops! Sorry about that. Try using the exact title of the movie" });
    }
}

function processMessage(event) {
    if (!event.message.is_echo) {
        var message = event.message;
        var senderId = event.sender.id;

        console.log("Received message from senderId: " + senderId);
        console.log("Message is: " + JSON.stringify(message));

        // You may get a text or attachment but not both
        if (message.text) {
            var formattedMsg = message.text.toLowerCase().trim();

            // If we receive a text message, check to see if it matches any special
            // keywords and send back the corresponding movie detail.
            // Otherwise search for new movie.
            switch (formattedMsg) {
                case "plot":
                case "date":
                case "runtime":
                case "director":
                case "cast":
                case "rating":
                    getMovieDetail(senderId, formattedMsg);
                    break;

                default:
                    findMovie(senderId, formattedMsg);
            }
        } else if (message.attachments) {
            sendMessage(senderId, { text: "Sorry, I don't understand your request." });
        }
    }
}

function findMovie(userId, movieTitle) {
    request("http://www.omdbapi.com/?type=movie&t=" + movieTitle, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObj = JSON.parse(body);
            if (movieObj.Response === "True") {
                var query = { user_id: userId };
                var update = {
                    user_id: userId,
                    title: movieObj.Title,
                    plot: movieObj.Plot,
                    date: movieObj.Released,
                    runtime: movieObj.Runtime,
                    director: movieObj.Director,
                    cast: movieObj.Actors,
                    rating: movieObj.imdbRating,
                    poster_url: movieObj.Poster
                };
                var options = { upsert: true };
                Movie.findOneAndUpdate(query, update, options, function (err, mov) {
                    if (err) {
                        console.log("Database error: " + err);
                    } else {
                        message = {
                            attachment: {
                                type: "template",
                                payload: {
                                    template_type: "generic",
                                    elements: [{
                                        title: movieObj.Title,
                                        subtitle: "Is this the movie you are looking for?",
                                        image_url: movieObj.Poster === "N/A" ? "http://placehold.it/350x150" : movieObj.Poster,
                                        buttons: [{
                                            type: "postback",
                                            title: "Yes",
                                            payload: "Correct"
                                        }, {
                                            type: "postback",
                                            title: "No",
                                            payload: "Incorrect"
                                        }]
                                    }]
                                }
                            }
                        };
                        sendMessage(userId, message);
                    }
                });
            } else {
                console.log(movieObj.Error);
                sendMessage(userId, { text: movieObj.Error });
            }
        } else {
            sendMessage(userId, { text: "Something went wrong. Try again." });
        }
    });
}

function getMovieDetail(userId, field) {
    Movie.findOne({ user_id: userId }, function (err, movie) {
        if (err) {
            sendMessage(userId, { text: "Something went wrong. Try again" });
        } else {
            sendMessage(userId, { text: movie[field] });
        }
    });
}

// sends message to user
function sendMessage(recipientId, message) {
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: "POST",
        json: {
            recipient: { id: recipientId },
            message: message,
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: " + response.error);
        }
    });
}





