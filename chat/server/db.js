var mysql = require('mysql');
function getClient() {
	var client = mysql.createClient();
	client.host='localhost';
	client.port= '3306';
	client.user='root';
	client.password='';
	client.database='mysql_db';
	return client;
}

exports.show = function() {
	var client = getClient();
	client.query('SELECT * FROM users', 
		function(error, result, fields){
			console.log(result);
		});
	client.end();
}

/**
*   Add new user to the db
*   @param {string} login User nickname
*   @param {string} pass User password
*   @param {function} answer Callback function to do something
*/
exports.add = function(login, pass, answer) {
	checkLogin(answer, login, pass, function callback(login, pass){
		var client = getClient();
		client.query('INSERT INTO users SET login = ?, pass = ?', [login, pass]);
		client.end();
	});
}

/**
*   Check login is exists
*	@param {function} answer Callback function to do
* 	@param {string} login User nickname
* 	@param {string} pass User password
* 	@param {function} callback function to do something
*/
function checkLogin(answer, login, pass, callback) {
	var client = getClient();
	var query = client.query('SELECT login FROM users WHERE login = ?', [login],
		function(error, result, fields){
			var exists = false;
			if(result.length == 1 && login == result[0].login) {
				exists = true;
			}
			else {
				callback(login, pass);
			}
			answer(exists);
		});
	client.end();
}

/**
*   Check user password
* 	@param {string} login User nickname
* 	@param {string} pass User password
* 	@param {function} callback function to do something
*/
exports.checkUserPass = function(login, pass, callback) {
	var client = getClient();
	var query = client.query('SELECT pass FROM users WHERE login = ?', [login],
		function(error, result, fields){
			var exists = false;
			if(result.length == 1 && pass == result[0].pass) {
				exists = true;
			}
			callback(exists);
		});
	client.end();
}