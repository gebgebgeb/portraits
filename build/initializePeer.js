const initializePeer = (id) => {

	let peer
	let productionServer = window.location.hostname.indexOf('localhost') === -1

	if (productionServer) {
		peer = new Peer(id, {key:'peerjs', port:443, host:'sleepy-earth-42956.herokuapp.com', path: '/api', debug:1})
	} else {
		peer = new Peer(id, {key:'peerjs', port:9000, host:'localhost', path: '/api', debug:3})
	}

	return peer
}