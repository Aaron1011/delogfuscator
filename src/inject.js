console.log("Sending message!")
chrome.runtime.sendMessage({something: "Test!"}, function(mappings) {
	console.log("I got a response!")
	for (var srg in mappings) {
		deobf = mappings[srg];
		replace(srg, deobf);
	}
});

// Copied from http://stackoverflow.com/a/1175796
function replace(a, b, element) {
	if (!element) element = document.body;
	var nodes = element.childNodes;
	for (var n=0; n<nodes.length; n++) {
		if (nodes[n].nodeType == Node.TEXT_NODE) {
			var r = new RegExp(a, 'g');
			nodes[n].textContent = nodes[n].textContent.replace(r, b);
		} else {
			replace(a, b, nodes[n]);
		}
	}
}

/*chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});*/