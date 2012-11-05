strings = {
	'connected': '[sys]Вы успешно соединились с сервером как [user]%name%[/user].[/sys]',
	'userJoined': '[sys]Пользователь [user]%name%[/user] присоединился к чату.[/sys]',
	'messageSend': '[out][user]%name%[/user]: %text%[/out]',
    'messageReceived': '[in][user]%name%[/user]: %text%[/in]',
    'userSplit': '[sys]Пользователь [user]%name%[/user] покинул чат.[/sys]'
};

window.onload = function() {
	var socket = io.connect('http://localhost:8080');
	socket.on('message', function (msg) {
		document.querySelector('#log').innerHTML += strings[msg.event].replace(/\[([a-z]+)\]/g, '<span class="$1">').replace(/\[\/[a-z]+\]/g, '</span>').replace(/\%name\%/, msg.name).replace(/\%text\%/, unescape(msg.text).replace('<', '&lt;').replace('>', '&gt;')) + '<br>';
		document.querySelector('#log').scrollTop = document.querySelector('#log').scrollHeight;
	});
	document.querySelector('#input').onkeypress = function(e) {
		if (e.which == '13') {
            socket.send(escape(document.querySelector('#input').value));
            document.querySelector('#input').value = '';
        }
	};
	document.querySelector('#send').onclick = function() {
        socket.send(escape(document.querySelector('#input').value));
        document.querySelector('#input').value = '';
    };
};

$(document).ready(function(){  
    //If user wants to end session  
    $("#exit").click(function(){  
        var exit = confirm("Are you sure you want to end the session?");  
        if(exit==true){window.location = '/login';}  
    });  
});  