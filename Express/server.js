const PORT = 3001;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// let http = require('http').Server(app);
// let io = require('socket.io')(http);
var server = app.listen(8810);
var io = require('socket.io').listen(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


console.log("Start services:");
require('./db.js')(app);
require('./cors.js')(app, 1);
////////////////////////////////////////////////////

global.sendNotification = function (data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic ZDM5ZmUzNjctMDY5My00ZDg0LThjMjItNmUwMjNhZGYzN2I0"
  };

  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };

  var https = require('https');
  var req = https.request(options, function (res) {
    res.on('data', function (data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });

  req.on('error', function (e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(data));
  req.end();
};

global.messagel = {
  app_id: "cc8485a9-a990-4930-9bd8-8701e9161832",
  headings: {"en": "Buna seara"},
  contents: { "en": "Buna seara" },
  included_segments: ["All"],
   filters: [
    { "field": "email", "relation": "=", "value": "prunariu.gigel@gmail.com" },
   ]
};

sendNotification(messagel);

//////////////////////////////////////////////////////
	const messageModel = require('./app/models/message.model.js');


////////////////////////////////////////////////////

global.users=[];


io.on('connection', (socket) => {
	
	global.PushMessages = async function(req) {
		
  await messageModel.update({channel: socket.socketID},{$push:{messages:{created: req.created, from: req.from, text: req.text}}})
     .then((allMessages) => {
        console.log("Updated");
	 }
	)
    .catch((err) => {
      console.log(err);
    });
};
		
  socket.on('join', function(data) {
	    socket.nickname = data.user;
		socket.socketID = data.socketID;
		console.log(data.userSelected);
		
		
		console.log(socket.nickname + " " + socket.socketID);
		
        socket.join(`${socket.socketID}`);
		
		if(users['`${data.socketid}`'] == undefined)
		{
			global.users['`${data.socketid}`'] = [];
			users['`${data.socketid}`'].push(socket.nickname);
		}
		else
		{
			users['`${data.socketid}`'].push(socket.nickname);
		}
		
		console.log(users['`${data.socketid}`']);
		
		io.in(`${socket.socketID}`).emit('users-changed', {user: socket.nickname, event: 'joined'});
		
    });
  
  
  socket.on('disconnect', function(){
    io.in(`${socket.socketID}`).emit('users-changed', {user: socket.nickname, event: 'left'}); 
	
	if(users['`${data.socketid}`']['0'] == socket.nickname)
		users['`${data.socketid}`'].shift();
	else if(users['`${data.socketid}`']['1'] == socket.nickname)
		users['`${data.socketid}`'].pop();
	
	console.log(users['`${data.socketid}`']);
	
	socket.leave(`${socket.socketID}`);
  });
  
  socket.on('add-message', (message) => {
	  console.log(users['`${data.socketid}`']);
	  // console.log("I am here" + message.text + `${message.socketID}`);
	  datenow = new Date();
	  datenow.setHours(datenow.getHours()+3);
	  datenow = datenow.toISOString()
	  io.in(`${message.socketID}`).emit('message', {text: message.text, from: socket.nickname, created: datenow});  
	  
	  PushMessages({created: datenow, from: socket.nickname, text: message.text});  
	  
	  if(users['`${data.socketid}`'].length == 1)
	  {
		console.log("send notification");
		
		messagel = {
			  app_id: "cc8485a9-a990-4930-9bd8-8701e9161832",
			  headings: {"en": socket.nickname},
			  contents: { "en": message.text },
			  included_segments: ["All"],
			  filters: [
				{ "field": "email", "relation": "=", "value": "prunariu.gigel@gmail.com" },
			  ]
			};
		
		sendNotification(messagel);
	  }
  });
});


////////////////////////////////////////////////////
console.log("");

require('./app/routes/user.routes.js')(app);
require('./app/routes/group.routes.js')(app);
require('./app/routes/message.routes.js')(app);


var server = app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is listening on port " + PORT);
});