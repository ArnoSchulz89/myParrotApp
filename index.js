'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const tracking = require('./lib/tracking');
const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());


function myCb(error, response, body) {
    if (!error && response.statusCode <= 200) {
        var latest = JSON.parse(body)[0];
        console.log(latest.point.description + ' is the state of your parcel');
    }else{
        switch (response.statusCode){
            case 400:
                console.log('bad request error code with an empty payload');
                break;

            case 401:
                console.log('unauthorized user');
                break;

            case 404:
                console.log('no parcel found for the supplied barcode. Returns an empty payload');
                break;

            case 429:
                console.log('too many requests');
                break;

            case 500:
                console.log('internal Server Error');
                break;
        }
    }
};


restService.post('/echo', function(req, res) {
    var googleReq = req.body.result.parameters.echoText;
    //console.log(googleReq);

    tracking.getTracking(googleReq, function (error, response, body) {
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
            }else{
                return res.json({
                    speech: speech,
                    displayText: speech,
                    sourche: 'gHomeHermesTrackingAPI'
                });
            }
        }
         
    });

});



restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
