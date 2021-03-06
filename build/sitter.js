const videoOfDrawer = document.getElementById('videoOfDrawer')
const videoOfDrawerCanvas = document.getElementById('videoOfDrawerCanvas')
const loader = document.getElementById('loader')
const saveButton = document.getElementById('saveDrawingSitter')
const sitterTitle = document.getElementById('sitterTitle')
let sitterInstructions = document.getElementById('sitterInstructions')

saveButton.hidden = true

let urlParams = new URLSearchParams(window.location.search);
let sitterId = urlParams.get('sitterId');

let peer = initializePeer(sitterId)
let portraitHistory

navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {
	peer.on('call', function(call) {
		// Answer the call, providing our mediaStream
		call.answer(mediaStream)
		sitterTitle.innerHTML = 'Drawing Started!'
		call.on('stream', function(stream) {
			saveButton.hidden = false
			sitterInstructions.hidden = true
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

