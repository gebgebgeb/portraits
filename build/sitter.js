const videoOfDrawer = document.getElementById('videoOfDrawer')
const videoOfDrawerCanvas = document.getElementById('videoOfDrawerCanvas')
const loader = document.getElementById('loader')

let urlParams = new URLSearchParams(window.location.search);
let sitterId = urlParams.get('sitterId');

let productionServer = window.location.hostname.indexOf('localhost') === -1

let peer
let portraitHistory

if (productionServer) {
	peer = new Peer(sitterId, {key:'peerjs', port:443, host:'sleepy-earth-42956.herokuapp.com', path: '/api', debug:1})
} else {
	peer = new Peer(sitterId, {key:'peerjs', port:9000, host:'localhost', path: '/api', debug:1})

}

navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {
	peer.on('call', function(call) {
		// Answer the call, providing our mediaStream
		call.answer(mediaStream);
		call.on('stream', function(stream) {
			if(call.metadata.type == 'webcam'){
				videoOfDrawer.srcObject = stream
			}
			if(call.metadata.type == 'canvas'){
				videoOfDrawerCanvas.srcObject = stream
				document.body.removeChild(loader)
			}
		});
	});
	peer.on('connection', (conn) => {
		conn.on('data', (portraitHist) => {
			portraitHistory = portraitHist
		})
	})
}).catch(function(err){
	if (err === 'DOMException: Requested device not found') {
		alert('You need a webcam to use this app, sorry!')
	} else {
		alert('Sorry! Something went wrong :(')
	}
});

const savePortrait = () => {
	if(portraitHistory.mousePositionArray.length > 20){
		axios.post('/saveportrait', portraitHistory).then((response)=>{
			window.open('/previousPortrait.html?id='+response.data)
		})
	}else{
		alert('Please wait for more to be drawn!')
	}
}

