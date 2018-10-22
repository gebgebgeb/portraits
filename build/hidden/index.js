let urlParams = new URLSearchParams(window.location.search);
let port = urlParams.get('port');

let sitterLink = document.getElementById("sitterLink")
let drawerLink = document.getElementById("drawerLink")

let randomPeerDrawer = Math.floor((Math.random()*1000))
let randomPeerSitter = Math.floor((Math.random()*1000))

sitterLink.href = "sitter.html?sitterId="+randomPeerSitter+"&drawerId="+randomPeerDrawer+'&port='+port
drawerLink.href = "drawer.html?drawerId="+randomPeerDrawer+"&sitterId="+randomPeerSitter+'&port='+port
