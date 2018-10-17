let sitterLink = document.getElementById("sitterLink")
let drawerLink = document.getElementById("drawerLink")

let randomPeerDrawer = Math.floor((Math.random()*1000))
let randomPeerSitter = Math.floor((Math.random()*1000))

sitterLink.href = "sitter.html?sitterId="+randomPeerSitter+"&drawerId="+randomPeerDrawer
drawerLink.href = "drawer.html?drawerId="+randomPeerDrawer+"&sitterId="+randomPeerSitter