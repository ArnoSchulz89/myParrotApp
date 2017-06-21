
//builds and returns a String "answer" dependent on Hermes Tracking API responses
exports.buildAnswerSentence = function (responseJson){
	var pStageDesc = responseJson.stage.description;
	var pPointDesc = responseJson.point.description;
	var pTime = new Date(responseJson.dateTime);
	var actualTime = new Date().get;

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