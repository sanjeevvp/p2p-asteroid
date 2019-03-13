function createPeerConnection(id) {
  var peer = new Peer(id, { key: "lwjd5qra8257b9" });

  peer.on("open", function(pid) {
    console.log("My peer ID is: " + pid);
  });
}
// var connections = [];

// function connectToPeer(peerId) {
//   connections.push(peer.connect(peerId));
// }
module.exports = { createPeerConnection };
