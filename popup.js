
$(document).ready(function(){
	chrome.storage.sync.get("time", function(obj){
		$("#fb").html(obj.time/1000);
	});
});