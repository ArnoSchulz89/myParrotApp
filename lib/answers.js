
//builds and returns a String "answer" dependent on Hermes Tracking API responses
exports.buildAnswerSentence = function (responseJson){
  //var pStageDesc - parcel Stage Description
	var pStageDesc = responseJson.stage.description;
	var pPointDesc = responseJson.point.description;
	
	var pTime = new Date(responseJson.dateTime);
	var isToday = false;
	var wasYesterday = false;
	var beforYesterday = false;

	switch(pStageDesc.toLowerCase()){
		case "delivered":
			pStageDesc = "was allready delivered to ";
			break;
		case "out for delivery":
			pStageDesc = "is actually out "; // sample: is actually out + 'with the local courier'
			break;
		case "we have your parcel":
			pStageDesc = "was "
		default:
			pStageDesc = pStageDesc.toLowerCase();
			break;
	}

	switch(pPointDesc.toLowerCase()){
		case "signature from household":
			pPointDesc = "household ";
			break;
		case "delivered to safe place":
			pPointDesc = "safe place ";
			break;
		case "we've collected your parcel":
			pPointDesc = "collected by hermes ";
			break;
		default:
			pPointDesc = pPointDesc.toLowerCase();
			break;
	}

	var answer = "Your Parcel " + pStageDesc + pPointDesc;
	return answer;
};




function timeDiff (timeObj){
	isToday = false;
	wasYesterday = false;
	var beforYesterday = false;

	var timeNow = new Date();
	var timeDiffMill = timeNow.getTime()-timeObj.getTime();
	var timeDiff = (timeNow.getMonth() - timeObj.getMonth()) + (timeNow.getDay() - timeObj.getDay());
	if(timeNow.getFullYear() == timeObj.getFullYear() && timeNow.getMonth() == timeObj.getMonth() && timeNow.getDay() == timeObj.getDay()){
		isToday = true;
	}else if(timeDiff >1 && timeDiffMill <= 172799999){
		wasYesterday = true;
	}
}


//rubbish test code :P
/*var isToday = false;
var wasYesterday = false;
var actualTime = new Date();
var sndTime = new Date('2017-06-19T14:39:12.064Z');
timeDiff(sndTime);
	console.log(sndTime.getMonth() + ' ' + isToday + ' ' + wasYesterday);*/