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
            sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
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
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "GAB disponible",
                    "subtitle": "Consultez",
                    "image_url": "https://www.comparatif-carte-de-credit.be/img/american-express-mastercard-visa-logo.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.google.bf/search?rlz=1C1NHXL_frBF779BF779&biw=1600&bih=794&q=GAB+CORIS+BANQUE&npsic=0&rflfq=1&rlha=0&rllag=12352601,-1505980,2159&tbm=lcl&ved=0ahUKEwjls837-N7ZAhUDwFkKHRFwDxgQjGoIWQ&tbs=lrf:!2m4!1e17!4m2!17m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:3&rldoc=1#rlfi=hd:;si:;mv:!1m3!1d20786.132230519084!2d-1.5254232!3d12.356123!2m3!1f0!2f0!3f0!3m2!1i599!2i256!4f13.1;tbs:lrf:!2m1!1e3!2m4!1e17!4m2!17m1!1e2!3sIAE,lf:1,lf_ui:3",
                        "title": "VISA"
                    }, {
                        "type": "web_url",
                        "url": "https://www.google.bf/search?rlz=1C1NHXL_frBF779BF779&biw=1600&bih=794&q=GAB+UBA&npsic=0&rflfq=1&rlha=0&rllag=12349389,-1513259,1458&tbm=lcl&ved=0ahUKEwjsqdSW-d7ZAhVLq1kKHYr_Ah8QjGoITQ&tbs=lrf:!2m4!1e17!4m2!17m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:3&rldoc=1#rlfi=hd:;si:;mv:!1m3!1d20055.420460186306!2d-1.5111939!3d12.355461900000002!2m3!1f0!2f0!3f0!3m2!1i348!2i494!4f13.1;tbs:lrf:!2m1!1e3!2m4!1e17!4m2!17m1!1e2!3sIAE,lf:1,lf_ui:3",
                        "title": "Master Card"
                    },{
                        "type": "web_url",
                        "url": "https://www.google.bf/search?rlz=1C1NHXL_frBF779BF779&biw=1600&bih=794&q=GAB+ECOBANK&npsic=0&rflfq=1&rlha=0&rllag=12362415,-1481037,1731&tbm=lcl&ved=0ahUKEwiYq7PA-d7ZAhUuwlkKHcxNCRUQjGoITg&tbs=lrf:!2m4!1e17!4m2!17m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:4&rldoc=1#rlfi=hd:;si:;mv:!1m3!1d23222.20425482326!2d-1.4940682!3d12.353902249999999!2m3!1f0!2f0!3f0!3m2!1i289!2i286!4f13.1;tbs:lrf:!2m1!1e3!2m4!1e17!4m2!17m1!1e2!3sIAE,lf:1,lf_ui:4",
                        "title": "American Express"
                    }],
                }, {
                    "title": "Reservez un ticket",
                    "subtitle": "Choisir sa banque",
                    "image_url": "https://cdn.pixabay.com/photo/2016/12/13/17/18/fax-1904644_960_720.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Coris Bank",
                        "payload": "Ticket N°1",
                    },{
                        "type": "postback",
                        "title": "UBA",
                        "payload": "Ticket N°2",
                    }, {
                        "type": "postback",
                        "title": "Ecobank",
                        "payload": "Ticket N°3",
                    }],
                },  {
                        "title": "Produits Bancaire ",
                    "subtitle": " Bon Plan ",
                    "image_url": "https://cdn.pixabay.com/photo/2015/11/23/10/52/ec-1058106_960_720.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://anfo44.files.wordpress.com/2017/01/bourse-logement-pour-2013-2014-l-gpi-w600h450zc1.jpg",
                        "title": "Etudiant", 
                        
                    },{
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

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Google Maps Service module.
 * @module @google/maps
 */

/**
 * Creates a Google Maps client. The client object contains all the API methods.
 *
 * @param {Object} options
 * @param {string} options.key API key (required, unless clientID and
 *     clientSecret provided).
 * @param {string=} options.clientId Maps API for Work client ID.
 * @param {string=} options.clientSecret Maps API for Work client secret (a.k.a.
 *     private key).
 * @param {string=} options.channel Maps API for Work channel.
 * @param {number=} options.timeout Timeout in milliseconds.
 *     (Default: 60 * 1000 ms)
 * @param {string=} options.language Default language for all queries.
        See https://developers.google.com/maps/faq#languagesupport
 * @param {number=} options.rate.limit Controls rate-limiting of requests.
 *     Maximum number of requests per period. (Default: 50)
 * @param {number=} options.rate.period Period for rate limit, in milliseconds.
 *     (Default: 1000 ms)
 * @param {number=} options.retryOptions.interval If a transient server error
 *     occurs, how long to wait before retrying the request, in milliseconds.
 *     (Default: 500 ms)
 * @param {Function=} options.Promise - Promise constructor (optional).
 * @return {GoogleMapsClient} The client object containing all API methods.
 */
exports.createClient = function (options) {

    options = options || {};
    var makeApiCall = require('./internal/make-api-call').inject(options);
    var deprecate = require('util').deprecate;

    var makeApiMethod = function (apiConfig) {
        return function (query, callback, customParams) {
            query = apiConfig.validator(query);
            query.supportsClientId = apiConfig.supportsClientId !== false;
            query.options = apiConfig.options;
            if (options.language && !query.language) {
                query.language = options.language;
            }
            // Merge query and customParams.
            var finalQuery = {};
            customParams = customParams || {};
            [customParams, query].map(function (obj) {
                Object.keys(obj).sort().map(function (key) {
                    finalQuery[key] = obj[key];
                });
            });
            return makeApiCall(apiConfig.url, finalQuery, callback);
        };
    };

    var geocode = require('./apis/geocode');
    var geolocation = require('./apis/geolocation');
    var timezone = require('./apis/timezone');
    var directions = require('./apis/directions');
    var distanceMatrix = require('./apis/distance-matrix');
    var elevation = require('./apis/elevation');
    var roads = require('./apis/roads');
    var places = require('./apis/places');

    return {
        directions: makeApiMethod(directions.directions),
        distanceMatrix: makeApiMethod(distanceMatrix.distanceMatrix),
        elevation: makeApiMethod(elevation.elevation),
        elevationAlongPath: makeApiMethod(elevation.elevationAlongPath),
        geocode: makeApiMethod(geocode.geocode),
        geolocate: makeApiMethod(geolocation.geolocate),
        reverseGeocode: makeApiMethod(geocode.reverseGeocode),
        places: makeApiMethod(places.places),
        placesNearby: makeApiMethod(places.placesNearby),
        placesRadar: deprecate(makeApiMethod(places.placesRadar), 'placesRadar is deprecated, see http://goo.gl/BGiumE'),
        place: makeApiMethod(places.place),
        placesPhoto: makeApiMethod(places.placesPhoto),
        placesAutoComplete: makeApiMethod(places.placesAutoComplete),
        placesQueryAutoComplete: makeApiMethod(places.placesQueryAutoComplete),
        snapToRoads: makeApiMethod(roads.snapToRoads),
        nearestRoads: makeApiMethod(roads.nearestRoads),
        speedLimits: makeApiMethod(roads.speedLimits),
        snappedSpeedLimits: makeApiMethod(roads.snappedSpeedLimits),
        timezone: makeApiMethod(timezone.timezone)
    };

};

exports.cli = require('./internal/cli');

    
        