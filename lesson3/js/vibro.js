/**
 * 
 */

function singleVib() {
	navigator.vibrate(1000);
}

function multiVib() {
	var command = "[1000";
	for (var i = 1000; i > 50; i = i - 50)
		command = command + "," + i;
	command = command + "]";
	var array = JSON.parse(command);
	navigator.vibrate(array);
}

function stopVib() {
	navigator.vibrate(0);
}

var adapter = null;
var CHECK_INTERVAL = 1000;

(function checkAdapter() {
	try {
		if (tizen.bluetooth == undefined) {
			alert("No bluetooth adapter found.");
		} else {
			adapter = tizen.bluetooth.getDefaultAdapter();
			window.setInterval(checkSliderBT, CHECK_INTERVAL);
		}

	} catch (e) {
		alert(e);
	}
}());

function checkSliderBT() {
	if (adapter.powered) {
		$("#btSlider").val("on");
	} else {
		$("#btSlider").val("off");
	}
	$("#btSlider").slider("refresh");
}

function switchBT() {
	if ($("#btSlider").val() == "on")
		BTpowerOn();
	else
		BTpowerOff();
}

function BTpowerOff() {
	adapter.setPowered(false, null, null);
}

function BTpowerOn() {
	adapter.setPowered(true, null, function(e){alert(e)});
}