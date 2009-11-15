jsio('import jsio.logging');
jsio('import world.server as server');

jsio.logging.getLogger('RTJPProtocol').setLevel(0);
jsio.logging.getLogger('world.server').setLevel(1);

worldServer = new server.WorldServer();

var listener = jsio.listen(worldServer, 'postmessage', {
	clientUrl: 'index.html?transport=postmessage'
})
var oldOnMessage = listener._onMessage;
var monitor;
listener._onMessage = function(evt) {
	oldOnMessage.apply(listener, arguments);
	if (!monitor) { 
		monitor = document.body.appendChild(document.createElement('div'));
		monitor.className = 'monitor';
	}
	var msg = eval('(' + evt.data + ')');
	monitor.innerHTML = msg.type + (msg.payload ? ': ' + msg.payload : '') + '<hr />' + monitor.innerHTML;
}

onload = function() {
	document.body.appendChild(listener._button);
}