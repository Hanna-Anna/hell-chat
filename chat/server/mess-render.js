exports.render = function(messages) {
	var output = '';
	//for(var i = 0; i < messages.length; i++) {
	for(var type in messages) {
		output += "<div class=\"messages " + type + "\">\n";
		output += messages[type];
		output += "</div>\n";
	}
	return output;
 }