exports.start = function(sockets) {
	sockets.on('connection', function(socket) {
		var id = (socket.id).toString().substr(0, 5);
		socket.json.send({'event': 'connected', 'name': id});
		socket.broadcast.json.send({'event': 'userJoined', 'name': id});
		socket.on('message', function(msg) {
			socket.json.send({'event': 'messageSend', 'name': id, 'text': msg});
			socket.broadcast.json.send({'event': 'messageReceived', 'name': id, 'text': msg});
		});
		socket.on('disconnect', function() {
			sockets.json.send({'event': 'userSplit', 'name': id});
		});
	});
}