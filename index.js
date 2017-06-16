'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    //do something with the echoText parameter.
    var echo = req.body.result.parameters.echoText;

    switch(toLowerCase(echo)){
        case "i love beer":
            var parrotText = "I love beer to buddy, please get me some!";
            break;

        case "i am stupid":
            var parrotText = "Yes, you are really stupid";
            break;

        default:
            var parrotText = echo + ' ' + echo;
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
