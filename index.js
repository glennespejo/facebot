/**
 * Created by mark.sancho on 6/27/2017.
 */
'user strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const token = 'EAATuSDbZCxEcBAJrh7ZCgnmitZAQLEZBhxEEIeFi9D1LGo325QETkgGlmkuJ0BTyNPFnZAth3bZBmSIHNk8jHv1iika1tDwZB1f76yY6mx7QalkcjaYG2Nbi48cJN7s3ZBsMp49EokyZCa88ZCSyib2mfDBZCvZBZAU2anKbIDFLFNAqUwAZDZD';

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot');
});

app.get('/help', function (req, res) {
    res.send('Privacy Policy');
});

app.get('/tos', function (req, res) {
    res.send('Terms of Service');
});

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
});

app.post('/webhook/', function (req, res) {
    var messaging_events = req.body.entry[0].messaging
    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i]
        var sender = event.sender.id
        if (event.message && event.message.text) {
            var text = event.message.text
            if(text.indexOf('weather') > -1) {
                sendTextMessage(sender, "the weather in manila is cloudy");
            }
            else if(text.indexOf('time') > -1) {
                sendTextMessage(sender, "the time now is 1:05PM");
            } 
			else if(text.indexOf('pogi') > -1) {
				sendTextMessage(sender, "of course you!");
			}
			else {
                sendTextMessage(sender, "try asking about the weather or time.");
            }
        }
    }
    res.sendStatus(200)
});

function sendTextMessage(sender, text) {
    var messageData = { text:text }
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

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})


