var timeStarted;
var fb = false;

chrome.tabs.onUpdated.addListener(
	function(tabID, changeInfo, Tab){
		if(!fb)
			if(changeInfo.status == "complete")
				if(Tab.url.indexOf("facebook") > -1)
				{
					fb = true;
					//alert("updated to fb");
					var date = new Date();
					timeStarted = date.getTime();
				}
					
});

chrome.tabs.onActivated.addListener(
	function(activeInfo)
		{
			chrome.tabs.get(activeInfo.tabId, function(tab){
				if(tab.url.indexOf("facebook") > -1)
				{
					if(fb == false)
						{
							//alert("changed to fb");
							fb = true;
							var date = new Date();
							timeStarted = date.getTime();
						}
				}
				else
				{
					if(fb)
					{
						console.log("more time");
						var time;
						chrome.storage.sync.get(["time", "date"], function(obj){
							time = obj.time; 
							var date = obj.date;
							console.log(obj);
							if(!time || time === undefined) time = 0;
							var date1 = new Date();
							var todaysDate = date1.getDate();
							if(!date || date === undefined) date = todaysDate;
							if(date != todaysDate)
								time = 0;
							time += date1.getTime() - timeStarted;
							chrome.storage.sync.set({"time" : time, "date":todaysDate}, function(){console.log(time/1000);});
							});
						fb = false;
					}
				}
			});
		}
);

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse){
	if(request.popupOpen)
	{
			var time;
			if(fb)
				{
					chrome.storage.sync.get(["time", "date"], function(obj){
								time = obj.time; 
								var date = obj.date;
								if(!time || time === undefined) time = 0;
								var date1 = new Date();
								var todaysDate = date1.getDate();
								if(!date || date === undefined) date = todaysDate;
								if(date != todaysDate)
									time = 0;
								time += date1.getTime() - timeStarted;
								timeStarted = date1.getTime();
								chrome.storage.sync.set({"time" : time, "date":todaysDate}, function(){console.log(time/1000);});
							});
				}
		
	}
});
/*
chrome.browserAction.onClicked.addListener(function(tab){
	if(fb)
	{
		var time;
		chrome.storage.sync.get("time", function(obj){
							time = obj.time; 
							if(!time) time = 0;
							var date1 = new Date();
							time += date1.getTime() - timeStarted;
							timeStarted = date1.getTime();
							chrome.storage.sync.set({"time" : time}, function(){console.log(time/1000);});
							});
	}
	
});
*/