
//builds and returns a String 'answer' dependent on Hermes Tracking API responses
exports.buildAnswerSentence = function (responseJson){
	var pStageDesc = responseJson.stage.description;
	var pPointDesc = responseJson.point.description;
	var pTime = responseJson.dateTime;

	switch(pStageDesc.toLowerCase()){
		case 'delivered':
			pStageDesc = 'was allready delivered to ';
			break;
		case 'out for delivery':
			pStageDesc = 'is actually out ';
			break;
		case 'we have your parcel':
			pStageDesc = 'was '
		default:
			break;
	}

	switch(pPointDesc.toLowerCase()){
		case 'signature from household':
			pPointDesc = 'household ';
			break;
		case 'delivered to safe place':
			pPointDesc = 'safe place ';
			break;
		default:
			break;
	}

	var answer = 'Your Parcel' + pStageDesc+pPointDesc;
	return answer;
};