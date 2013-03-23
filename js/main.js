$(function() {
	chrome.browserAction.onClicked.addListener(function() { 
		chrome.tabs.create({url: "http://forum.f-bg.org/"});
	});
	var autoReloadTimer = null;
	autoReload = function() {
		if (autoReloadTimer) { clearTimeout(autoReloadTimer); }
		
		$.getJSON('http://forum.f-bg.org/ajaxify.php?act=getnotifications', function(data) {
			if (data) {
				var pm_count = parseInt(data.notifications.pm_count);
				var post_event_count = (data.notifications.post_event_count > 0) ? parseInt(data.notifications.post_event_count) : 0;
				var topic_event_count = (data.notifications.topic_event_count > 0) ? parseInt(data.notifications.topic_event_count) : 0;
				var message_event_count = (data.notifications.message_event_count > 0) ? parseInt(data.notifications.message_event_count) : 0;
				//alert(pm_count + post_event_count + topic_event_count + message_event_count);
				var notifs = 0;
				notifs = pm_count + post_event_count + topic_event_count + message_event_count;
				
				if (notifs > 0) {
					chrome.browserAction.setBadgeText({text: notifs.toString()});
				}
				else { chrome.browserAction.setBadgeText({text: ""}); }
			}
			else { 
				chrome.browserAction.setBadgeText({text: "n/a"});
			}
		});
		autoReloadTimer = setTimeout(function() {
			autoReload();
		}, 60000);
	}

	autoReload();

});