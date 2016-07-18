// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts


console = chrome.extension.getBackgroundPage().console;
console.log("STARTED");

//chrome.tabs.executeScript(null, {file:'vendor/jszip.js'});

var request = new XMLHttpRequest();
request.open("GET", "http://export.mcpbot.bspk.rs/mcp_stable/22-1.8.9/mcp_stable-22-1.8.9.zip", true);
request.responseType = "arraybuffer";

mapping = {};

request.onload = function() {
    console.log("Loaded zip!")
    var new_zip = new JSZip();
    new_zip.loadAsync(request.response).then(function(zip) {
        console.log('Reading file!')
        zip.file("methods.csv").async("string").then(function(content) {
            var lines = content.split("\n")

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].split(',');
                var srg = line[0];
                var deobf = line[1];

                mapping[srg] = deobf;
            }

            console.log("field_78517_a = " + mapping["field_78517_a"])
        }, function error(e) {
            console.error("Error: " + e)
        })
    })

}

request.send(null);


chrome.browserAction.onClicked.addListener(function(tab) {
    console.error("CLICKED!");
    chrome.tabs.executeScript({
        file: 'src/inject.js'
    });
});



chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log("I got a message:" + request);
    sendResponse(mapping);
  });