'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

const request = require('request');

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());



// Set the headers
var headers = [
    {"Accept" : "*/*"},

    {"Accept-Encoding" : "gzip"},

    {"Accept-Language" : "de-DE"},

    {"apikey" : "Mo9ILZ1MFroWqdyNQ9O82xxRr4s6pUul"},

    {"Host" : "hermestest-dev.apigee.net"},

    {"Origin" : "http%3A//developer.hermesworld.co.uk"},

    {"Referer" : "http%3A//developer.hermesworld.co.uk/tracking-api/apis/get/events"},

    {"User-Agent" : ""},

    {"X-Forwarded-For" : "5.148.154.254"},

    {"X-Forwarded-Port" : "443"},

    {"X-Forwarded-Proto" : "https"}


];    

// Configure the request
var options = {
    'url': 'https://hermestest-dev.apigee.net/tracking/devportal/events',
    'method': 'GET',
    'barcode': '0000000000000019',
    //'apikey' : 'Mo9ILZ1MFroWqdyNQ9O82xxRr4s6pUul'
    'headers' : headers
};

// Start the request

/*restService.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    }
    return response.body.result.parameter.description
});*/




restService.post('/echo', function(req, res) {
    //do something with the echoText parameter.
    var echo = req.body.result.parameters.echoText

    switch(echo.toLowerCase()){
        case "i love beer":
            var parrotText = "I love beer to Arno, please get me some!";
            break;

        case "i am stupid":
            var parrotText = "I am not stupid. Don't try to fool me!";
            break;
            
        case "where is my parcel":
            var parrotText = "I have no clue.";
            break;

        default:
            var parrotText = echo + '. ' + echo;
    }

    // var parrotText = "i love beer" ? "I love beer to buddy" : echo + ' ' + echo;
    //
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? parrotText : "Seems like some problem. Speak again."
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'myParrotAPI'
    });
});

/*restService.post('/slack-test', function(req, res) {

    var slack_message = {
        "text": "Details of JIRA board for Browse and Commerce",
        "attachments": [{
            "title": "JIRA Board",
            "title_link": "http://www.google.com",
            "color": "#36a64f",

            "fields": [{
                "title": "Epic Count",
                "value": "50",
                "short": "false"
            }, {
                "title": "Story Count",
                "value": "40",
                "short": "false"
            }],

            "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        }, {
            "title": "Story status count",
            "title_link": "http://www.google.com",
            "color": "#f49e42",

            "fields": [{
                "title": "Not started",
                "value": "50",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }]
        }]
    }
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
    });
});
*/


restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
