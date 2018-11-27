cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-webrtc.WebRTC",
    "file": "plugins/cordova-plugin-webrtc/dist/webrtc.js",
    "pluginId": "cordova-plugin-webrtc",
    "clobbers": [
      "webrtc"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-webrtc": "0.1.1"
};
// BOTTOM OF METADATA
});