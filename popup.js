chrome.runtime.sendMessage({popupOpen: true});
var time;

$(document).ready(function(){
	console.log(time);
	
	chrome.storage.onChanged.addListener(function(changes, namespace){
		var storage_change = changes["time"];
		time = storage_change.newValue;
		var min = time/60000;
		var sec = (time/1000) % 60;
		if(Math.floor(min) > 90)
			$('#fb').css("color", "red");
		else
			$('#fb').css("color", "green");
		$("#fb").html(Math.floor(min) + " minutes, " + Math.floor(sec) + " sec"  );
});
	chrome.storage.sync.get("time", function(obj){
		time = obj.time;
		var min = time/60000;
		var sec = (time/1000) % 60;
		if(Math.floor(min) >= 90)
			$('#fb').css("color", "red");
		else
			$('#fb').css("color", "green");
		
		$("#fb").html( Math.floor(min) + " minutes, " + Math.floor(sec) + " sec" );
	});
	
});
