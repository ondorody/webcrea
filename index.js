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
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyARj7YbiKz5v77ZzurXMDKyoRHCfqUKg34'
});
// Geocode an address.
googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function (err, response) {
    if (!err) {
        console.log(response.json.results);
    }
    });
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 45.518, lng: -122.672 },
        zoom: 18,
        mapTypeId: 'satellite',
        heading: 90,
        tilt: 45
    });
}

function rotate90() {
    var heading = map.getHeading() || 0;
    map.setHeading(heading + 90);
}

function autoRotate() {
    // Determine if we're showing aerial imagery.
    if (map.getTilt() !== 0) {
        window.setInterval(rotate90, 3000);
    }
}
// This example defines an image map type using the Gall-Peters
// projection.
// https://en.wikipedia.org/wiki/Gall%E2%80%93Peters_projection

function initMap() {
    // Create a map. Use the Gall-Peters map type.
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 0,
        center: { lat: 0, lng: 0 },
        mapTypeControl: false
    });

    initGallPeters();
    map.mapTypes.set('gallPeters', gallPetersMapType);
    map.setMapTypeId('gallPeters');

    // Show the lat and lng under the mouse cursor.
    var coordsDiv = document.getElementById('coords');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
    map.addListener('mousemove', function (event) {
        coordsDiv.textContent =
            'lat: ' + Math.round(event.latLng.lat()) + ', ' +
            'lng: ' + Math.round(event.latLng.lng());
    });

    // Add some markers to the map.
    map.data.setStyle(function (feature) {
        return {
            title: feature.getProperty('name'),
            optimized: false
        };
    });
    map.data.addGeoJson(cities);
}

var gallPetersMapType;
function initGallPeters() {
    var GALL_PETERS_RANGE_X = 800;
    var GALL_PETERS_RANGE_Y = 512;

    // Fetch Gall-Peters tiles stored locally on our server.
    gallPetersMapType = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            var scale = 1 << zoom;

            // Wrap tiles horizontally.
            var x = ((coord.x % scale) + scale) % scale;

            // Don't wrap tiles vertically.
            var y = coord.y;
            if (y < 0 || y >= scale) return null;

            return 'https://developers.google.com/maps/documentation/' +
                'javascript/examples/full/images/gall-peters_' + zoom +
                '_' + x + '_' + y + '.png';
        },
        tileSize: new google.maps.Size(GALL_PETERS_RANGE_X, GALL_PETERS_RANGE_Y),
        isPng: true,
        minZoom: 0,
        maxZoom: 1,
        name: 'Gall-Peters'
    });

    // Describe the Gall-Peters projection used by these tiles.
    gallPetersMapType.projection = {
        fromLatLngToPoint: function (latLng) {
            var latRadians = latLng.lat() * Math.PI / 180;
            return new google.maps.Point(
                GALL_PETERS_RANGE_X * (0.5 + latLng.lng() / 360),
                GALL_PETERS_RANGE_Y * (0.5 - 0.5 * Math.sin(latRadians)));
        },
        fromPointToLatLng: function (point, noWrap) {
            var x = point.x / GALL_PETERS_RANGE_X;
            var y = Math.max(0, Math.min(1, point.y / GALL_PETERS_RANGE_Y));

            return new google.maps.LatLng(
                Math.asin(1 - 2 * y) * 180 / Math.PI,
                -180 + 360 * x,
                noWrap);
        }
    };
}

// GeoJSON, describing the locations and names of some cities.
var cities = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-87.650, 41.850] },
        properties: { name: 'Chicago' }
    }, {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-149.900, 61.218] },
        properties: { name: 'Anchorage' }
    }, {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-99.127, 19.427] },
        properties: { name: 'Mexico City' }
    }, {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-0.126, 51.500] },
        properties: { name: 'London' }
    }, {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [28.045, -26.201] },
        properties: { name: 'Johannesburg' }
    }, {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [15.322, -4.325] },
        properties: { name: 'Kinshasa' }
    }, {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [151.207, -33.867] },
        properties: { name: 'Sydney' }
    }, {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
        properties: { name: '0°N 0°E' }
    }]

   <HTMLAllCollection> < iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?q=BANQUE&key=AIzaSyBYZQDnBdvoOwUmv9o_eXmd0oYypPvc-7s" allowfullscreen></iframe>