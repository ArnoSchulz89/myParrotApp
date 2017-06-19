'use strict';

//const tracking = require('./lib/tracking');

cconst express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {

    var googleText = req.body.result.parameters.echoText;

    switch(googleText.toLowerCase()){
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
        source: 'webhook-echo-sample'
    });
});



/*function myCb(error, response, body) {
    if (!error && response.statusCode == 200) {
        var latest = JSON.parse(body)[0];
        console.log(latest.point.description);
    }
};
*/
//tracking.getTracking('0000000000000010', myCb);


restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
