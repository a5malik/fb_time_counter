chrome.runtime.sendMessage({popupOpen: true});
var time;

$(document).ready(function(){
	console.log(time);
	
	chrome.storage.onChanged.addListener(function(changes, namespace){
		var storage_change = changes["time"];
		time = storage_change.newValue;
		$("#fb").html(time/1000);
});
	chrome.storage.sync.get("time", function(obj){
		time = obj.time;
		$("#fb").html(time/1000);
	});
	
});
