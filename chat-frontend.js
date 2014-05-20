$(document).ready(function(){
	"use strict";

	// if user is running mozilla then use it's built-in WebSocket
	window.WebSocket = window.WebSocket || window.MozWebSocket;

	// if browser doesn't support WebSocket, just show some notification and exit
	if (!window.WebSocket) {
		// return;
	}
	// open connection
	var connection = new WebSocket('ws://140.112.30.33:25566');

	connection.onopen = function () {
		console.log("Connected!");
		var msgToSend = JSON.stringify({ sender : "webController", action: "handshake", data: "N/A" });
		connection.send(msgToSend);
	};

	connection.onerror = function (error) {
		// just in there were some problems with conenction...
	};

	// most important part - incoming messages
	connection.onmessage = function (message) {
		var json = JSON.parse(""+message.data);
		console.log(json.receiver);
	};
	
	/**
	 * This method is optional. If the server wasn't able to respond to the
	 * in 3 seconds then show some error message to notify the user that
	 * something is wrong.
	 */
	setInterval(function() {
		if (connection.readyState !== 1) {
			status.text('Error');
			console.log('Unable to comminucate with the WebSocket server.');
		}
	}, 3000);



/* 以下是Btn把訊息送出的處理部分 */


	function sendMessageToServer(sender_, action_, data_){
		var msgToSend = JSON.stringify({ sender : sender_, action: action_, data: data_ });
		connection.send(msgToSend);	
	}
	    			
	$( "#btnLookGlass" ).click(function() {
		sendMessageToServer("eyeTracker", "stateChange", "lookingGlass");
	});
	
	$( "#btnLookForward" ).click(function() {
		sendMessageToServer("eyeTracker", "stateChange", "lookingForward");
	});
	$( "#btnLookMobile" ).click(function() {
		sendMessageToServer("eyeTracker", "stateChange", "lookingMobile");
	});
	
	$( "#btnNotif_idiot" ).click(function() {
		sendMessageToServer("webController", "notification", "idiot");
	});
	$( "#btnNotif_HR" ).click(function() {
		sendMessageToServer("webController", "notification", "HR");
	});
	$( "#btnNotif_friend" ).click(function() {
		sendMessageToServer("webController", "notification", "friend");
	});


});
