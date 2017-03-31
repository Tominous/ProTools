//META{"name":"protools"}*//

function protools() {}

protools.prototype.load = function() {
	console.log("ProTools loaded");
	setInterval(loop, 33);
};

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}


var hooked = false;
var command = "";

function clearUnread()
{
	console.log("ProTools: clearUnread");

	var count = 0;
	while(document.getElementsByClassName("guild unread").length != 0 && count < 1000)
	{
		nextUnread();
		count++;
	}
}

function nextUnread()
{
	console.log("ProTools: nextUnread");

	document.getElementsByClassName("guild unread")[0].getElementsByClassName("avatar-small")[0].click();
	document.getElementsByClassName("channel channel-text unread")[0].children[0].click();

	setTimeout(function()
	{
		document.getElementsByClassName("new-messages-bar")[0].children[1].click();
	}, 1000);

}


function loop()
{
	if(document.getElementsByClassName("big-input").length != 0)
	{
		if(!hooked)
		{
			document.getElementsByClassName("big-input")[0].addEventListener("keydown", function(e){

				var input = document.getElementsByClassName("big-input")[0];
				var scroller = document.getElementsByClassName("results-scroller")[0];
				var empty = document.getElementsByClassName("quickswitcher-empty-state")[0];



				if(e.keyCode == 13)
				{
					if(input.value == "-clear")
					{
						clearUnread();
					}

					if(input.value == "-next")
					{
						nextUnread();
					}
				}




			}, false);

			hooked = true;
		}
		//console.log("ProTools " + document.getElementsByClassName("big-input")[0].value);
	}
	else {
		hooked = false;
	}
}



protools.prototype.unload = function() {
	console.log("ProTools unloaded")
};

protools.prototype.start = function() {


};

protools.prototype.stop = function() {

};

protools.prototype.getName = function() {
    return "ProTools";
};

protools.prototype.getDescription = function() {
    return "Add additional poweruser functions, like keybinds and commands to quickswitcher.";
};

protools.prototype.getVersion = function() {
    return "0.0";
};

protools.prototype.getAuthor = function() {
    return "Noxim";
};

protools.prototype.getSettingsPanel = function() {
	return "";
};
