// Load libraries
// WebSocket = require("ws"); // https://www.npmjs.com/package/ws
// SFS2X = require("sfs2x-api"); // https://www.npmjs.com/package/sfs2x-api
 
//------------------------------------------------------------------------------
 
// Create configuration object
var config = {};
config.host = "localhost";
config.port = 8080;
config.debug = true;
config.useSSL = false;
 
// Create SmartFox client instance
let sfs = new SFS2X.SmartFox(config);
 
// Add connection event listeners
sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);
sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost, this);
 
// Connect to SmartFoxServer
sfs.connect();
//------------------------------------------------------------------------------
 
// Connection event handler
function onConnection(event)
{
    // if (event.success) {
    //   fetch('sample.txt')
    //   .then(function(res){
    //     console.log(res);
    //   })

    if (event.success) {
    // fetch('sample.txt')
    // .then((res) => res.text())
    // .then((data) => {
    //   document.getElementById('output').innerHTML = data;
    // })

    fetch('json_file.json')
      .then((res) => res.json())
      .then((data) => {
        let output = `<h2 class='h2'>University's List</h2>
            <table class='table'>
              <tr class='th'>
                <th>University</th>
                <th>Location</th>
                <th>Url</th>
              </tr>

        `;
        data.forEach(function(user){
          output += `
              <tr class='td'>
                <td>${user.university}</td>
                <td>${user.location}</td>
                <td>${user.url}</td>
              </tr>

          `;
        })
        document.getElementById('output').innerHTML = output;
      })    
    }
    
  else
        console.warn("Connection failed: " + (event.errorMessage ? event.errorMessage + " (" + event.errorCode + ")" : "Is the server running at all?"));
  }


// Disconnection event handler
function onConnectionLost(event)
{
    console.warn("Disconnection occurred; reason is: " + event.reason);
}