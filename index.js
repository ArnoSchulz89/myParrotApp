'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const tracking = require('./lib/tracking');
const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());


function myCb2 (error, response, body) {
        if (!error && response.statusCode == 200) {
            var latest = JSON.parse(body)[0];
            console.log(latest.point.description + ' is the state of your parcel');
            var hermesTrackingRes = 'let me have a look ... your Hermes parcel is: ' + latest.point.description;           
        }
        return hermesTrackingRes;
         
    }


restService.post('/echo', function(req, res) {
    var googleReq = req.body.result.parameters.echoText;
    var req = req;
    //console.log(googleReq);

    var hermesRes = tracking.getTracking(googleReq, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var latest = JSON.parse(body)[0];
            console.log(latest.point.description + ' is the state of your parcel');
            var hermesRes = 'let me have a look ... your Hermes parcel is: ' + latest.point.description;

            if(hermesRes != ''){
                var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? hermesRes : "I didn't get it rigth, please Speak again."
                return res.json({
                    speech: speech,
                    displayText: speech,
                    source: 'gHomeHermesTrackingAPI'
                });
            }
        }
         
    }

});



restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
