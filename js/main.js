window.onload = function() {
    console.log("onload");

    var flagConsole = false;
    var level = Number(widget.preferences.getItem("level"));    
    console.log("level: " + level);
    newLevel = level;
    strLevel.value = newLevel; 
    var spell = [];
    var meaning = [];
    var index = 100;

    function onSpellFileRead(str) {
        spell = str.split(";");
        console.log(spell[0] + ", length: " + spell.length);
    }

    function onMeaningFileRead(str) {
        meaning = str.split(";");
        console.log(meaning[0] + ", length: " + meaning.length);
    }

    function onFileReadError(e) {
        console.error("Error" + e.message);
    }

    tizen.filesystem.resolve(
        'wgt-package/voca/spell_' + level,
        function(file) {
            file.readAsText(onSpellFileRead, onFileReadError);
        },
        function(e) {
            console.log("Error" + e.message);
        }, "r"
    );
    tizen.filesystem.resolve(
        'wgt-package/voca/meaning_' + level,
        function(file) {
            file.readAsText(onMeaningFileRead, onFileReadError);
        },
        function(e) {
            console.log("Error" + e.message);
        }, "r"
    );

    function updateTime() {
        var strHours = document.getElementById("str-hours");
        var strConsole = document.getElementById("str-console");
        var strMinutes = document.getElementById("str-minutes");
        var now = tizen.time.getCurrentDateTime();
        var curHour = now.getHours();
        var curMin = now.getMinutes();

        strHours.innerHTML = (curHour < 10) ? '0' + curHour : curHour;
        strMinutes.innerHTML = (curMin < 10) ? '0' + curMin : curMin;

        // Each 0.5 second the visibility of flagConsole is changed.
        strConsole.style.visibility = (flagConsole) ? "visible" : "hidden";
        flagConsole = !flagConsole;
    }
    setInterval(updateTime, 500);

    var status = 0; // 0: spell, 1: meaning, 2: spell, 3: meaning
    var i = 0;
    function updateWord() {
        var strVoca = document.getElementById("str-voca");
        var strIndex = document.getElementById("str-index");
        index = (level-1) * 100 +  i;
        strIndex.innerHTML = index;
        strVoca.innerHTML = (status % 2 === 0) ? spell[i] : meaning[i];
        status++;
        if(status > 3) {
        	status = 0;
        	i++;
        }
    }
    setInterval(updateWord, 1000);
};


function showConfig() {
	console.log("showConfig");
	var divConfig = document.getElementById("config");
	divConfig.style.visibility = "visible";
}


var strLevel = document.getElementById("str-level");
var newLevel;
function onNextBtn() {
	console.log("onNextBtn");	
	newLevel = newLevel + 1;
	if(newLevel > 80) newLevel = 80;
	console.log("newLevel: " + newLevel);
	strLevel.value = newLevel;
}
function onPrevBtn() {
	console.log("onPrevBtn");	
	newLevel = newLevel - 1;
	if(newLevel < 5) newLevel = 5;
	console.log("newLevel: " + newLevel);
	strLevel.value = newLevel;
}
function onNextNextBtn() {
	console.log("onNextNextBtn");
	newLevel = newLevel + 5;
	if(newLevel > 80) newLevel = 80;
	console.log("newLevel: " + newLevel);
	strLevel.value = newLevel;
}
function onPrevPrevBtn() {
	console.log("onPrevPrevBtn");
	newLevel = newLevel - 5;
	if(newLevel < 5) newLevel = 5;
	console.log("newLevel: " + newLevel);
	strLevel.value = newLevel;
}
function changeLevel() {
	console.log("changeLevel. " + newLevel);
	widget.preferences.setItem("level", newLevel);	
}