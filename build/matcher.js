let sitterLink = document.getElementById("sitterLink")
let drawerLink = document.getElementById("drawerLink")

let urlParams = new URLSearchParams(window.location.search);
let sitterId = urlParams.get('sitterId');
let drawerId = urlParams.get('drawerId');

sitterLink.href = "sitter.html?sitterId="+sitterId
drawerLink.href = "drawer.html?drawerId="+drawerId+"&sitterId="+sitterId
