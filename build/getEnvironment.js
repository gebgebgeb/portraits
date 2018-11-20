const getEnvironment = () => {

	let path
	let productionServer = window.location.hostname.indexOf('localhost') === -1

	if (productionServer) {
		path = 'https://sleepy-earth-42956.herokuapp.com'
	} else {
		path = 'http://localhost:9000'
	}

	return path
}