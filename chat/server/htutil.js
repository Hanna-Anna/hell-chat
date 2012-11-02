var url = require('url');
exports.loadParams = function(req, res, next) {
	req.requrl = url.parse(req.url, true);
	req.login = req.requrl.query.login;
	req.name = req.requrl.query.name;
	req.pass = req.requrl.query.pass;
	if(req.requrl.query.pass == req.requrl.query.pass2) {
		req.passValid = req.requrl.query.pass;
	}
	if (next) next();
}