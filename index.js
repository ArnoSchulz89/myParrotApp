'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const tracking = require('./lib/tracking');


const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

//var googleText = 'placeholder';


/*function googleRequest(){
    restService.post('/echo', function(req, res) {
        //do something with the echoText parameter.
        googleText = req.body.result.parameters.echoText;

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
                var parrotText = googleText + '. ' + googleText;
        }

        var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? parrotText : "Seems like some problem. Speak again."
        return res.json({
            speech: speech,
            displayText: speech,
            source: 'myParrotAPI'
        });
    });
};
*/


function myCb(error, response, body) {
    if (!error && response.statusCode == 200) {
        var latest = JSON.parse(body)[0];
        console.log(latest.point.description + ' is the state of your parcel');
    }
};


restService.post('/echo', function(req, res) {
    var googleReq = req.body.result.parameters.echoText;
    console.log(googleReq);

    tracking.getTracking(googleReq, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var latest = JSON.parse(body)[0];
            console.log(latest.point.description + ' is the state of your parcel');
            var hermesRes = latest.point.description;

            if(hermesRes != ''){
                var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? hermesRes : "Seems like some problem. Speak again."
                return res.json({
                    speech: speech,
                    displayText: speech,
                    source: 'ArnosAPI'
                });
            } 
        }

         
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
});*/




restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
