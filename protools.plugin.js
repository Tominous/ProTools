//META{"name":"protools"}*//

function protools() {}

var ctrlKeyCode = 17;
var spaceKeyCode = 32;
var enterKeyCode = 13;
var tKeyCode = 84;

var hooked = false;
var command = "";
var ctrlDown = false;

var vaporMode = false;
var vaporDefault = "";

protools.prototype.load = function() {
	console.log("ProTools loaded");
	setInterval(loop, 33);

	document.addEventListener("keydown", function(e) {

		if(e.keyCode == tKeyCode)
		{
			if(ctrlDown)
			{
				console.log("Command window opened");

				setTimeout(function() {
					document.getElementsByClassName("big-input")[0].value = ":";
				}, 50);

			}
		}

		if(e.keyCode == ctrlKeyCode)
		{
			ctrlDown = true;
		}

	});
	document.addEventListener("keyup", function(e) {
		if(e.keyCode == ctrlKeyCode)
		{
			ctrlDown = false;
		}
	});

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

function vaporwave()
{
	console.log("ProTools: Vaporwave");
	vaporMode = !vaporMode;

	if(vaporMode)
	{
		vaporDefault = document.getElementsByClassName("channel-textarea-inner")[0].style.background;
		document.getElementsByClassName("channel-textarea-inner")[0].style.background = "#dd88bb";
	}
	else {
		document.getElementsByClassName("channel-textarea-inner")[0].style.background = vaporDefault;
	}
}

function changeGuild(args)
{
	console.log("ProTools: Guild");
	document.getElementsByClassName("guild")[Number(args) + 2].getElementsByClassName("avatar-small")[0].click();
}

function changeText(args)
{
	console.log("ProTools: Text");
	document.getElementsByClassName("channel-text")[Number(args) + 0].children[0].click();
}

function vaporVersion(text)
{
	var wide = {
		" ": "　",
		"`": "`",
		"1": "１",
		"2": "２",
		"3": "３",
		"4": "４",
		"5": "５",
		"6": "６",
		"7": "７",
		"8": "８",
		"9": "９",
		"0": "０",
		"-": "－",
		"=": "＝",
		"~": "~",
		"!": "！",
		"@": "＠",
		"#": "＃",
		"$": "＄",
		"%": "％",
		"^": "^",
		"&": "＆",
		"*": "＊",
		"(": "（",
		")": "）",
		"_": "_",
		"+": "＋",
		"q": "ｑ",
		"w": "ｗ",
		"e": "ｅ",
		"r": "ｒ",
		"t": "ｔ",
		"y": "ｙ",
		"u": "ｕ",
		"i": "ｉ",
		"o": "ｏ",
		"p": "ｐ",
		"[": "[",
		"]": "]",
		"\\": "\\",
		"Q": "Ｑ",
		"W": "Ｗ",
		"E": "Ｅ",
		"R": "Ｒ",
		"T": "Ｔ",
		"Y": "Ｙ",
		"U": "Ｕ",
		"I": "Ｉ",
		"O": "Ｏ",
		"P": "Ｐ",
		"{": "{",
		"}": "}",
		"|": "|",
		"a": "ａ",
		"s": "ｓ",
		"d": "ｄ",
		"f": "ｆ",
		"g": "ｇ",
		"h": "ｈ",
		"j": "ｊ",
		"k": "ｋ",
		"l": "ｌ",
		";": "；",
		"'": "＇",
		"A": "Ａ",
		"S": "Ｓ",
		"D": "Ｄ",
		"F": "Ｆ",
		"G": "Ｇ",
		"H": "Ｈ",
		"J": "Ｊ",
		"K": "Ｋ",
		"L": "Ｌ",
		":": "：",
		"\"": "\"",
		"z": "ｚ",
		"x": "ｘ",
		"c": "ｃ",
		"v": "ｖ",
		"b": "ｂ",
		"n": "ｎ",
		"m": "ｍ",
		",": "，",
		".": "．",
		"/": "／",
		"Z": "Ｚ",
		"X": "Ｘ",
		"C": "Ｃ",
		"V": "Ｖ",
		"B": "Ｂ",
		"N": "Ｎ",
		"M": "Ｍ",
		"<": "<",
		">": ">",
		"?": "？"
	};
	var charArray = text.split("");
	for (var i = 0; i < charArray.length; i++) {
		if (wide[charArray[i].toLowerCase()]) {
			charArray[i] = wide[charArray[i]];
		}
	}
	text = charArray.join("");
	return text;
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
				var empty = document.getElementsByClassName("quickswitcher-	empty-state")[0];


				var command = input.value.split(" ")[0];
				var args = input.value.slice(input.value.indexOf(" ") + 1).trim();

				if(e.keyCode == enterKeyCode)
				{
					if(command == ":next" || command == ":n")
					{
						nextUnread();
					}

					if(command == ":vaporwave" || command == ":vw")
					{
						vaporwave();
					}

					if(command == ":guild" || command == ":g")
					{
						changeGuild(args);
					}

					if(command == ":text" || command == ":t")
					{
						changeText(args);
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

	if(vaporMode)
	{
		document.getElementsByClassName("channel-textarea-inner")[0].children[1].value = vaporVersion(document.getElementsByClassName("channel-textarea-inner")[0].children[1].value);

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
