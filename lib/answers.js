

function buildAnswer(responseJson){
	var answer = 'let me have a look ... your Hermes parcel is: ' + responseJson.point.description;
	return answer;
};