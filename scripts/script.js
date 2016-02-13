var terminal = document.getElementById("terminal");
var terminalWindow = document.getElementById("terminalWindow");
var workFolderWindow = document.getElementById("workFolder");
var terminalInput = document.getElementById("terminalCommand"); 
var terminalOutput = document.getElementById("terminalDisplay");
var icon = document.getElementById("icon");
var closeButtons = document.getElementsByClassName("closeButton");

var resumeIcon = document.getElementById("resumeIcon");
var resumeWindow = document.getElementById("resumeWindow");

resumeIcon.addEventListener("dblclick", function(event) {
    document.getElementById("resumeWindow").className= "frame";
});

icon.addEventListener("dblclick", function(event) {
    workFolderWindow.className = "drawWindow"; 
});

for(var button of closeButtons) {
    button.addEventListener("click", function(event) {
        console.log(document.getElementById(event.target.dataset.close));
        document.getElementById(event.target.dataset.close).className = "hidden";
    });
}


terminal.addEventListener("click", function(event){
    terminalInput.focus();
});


    
/**
 * This object takes an input element, an output elements and a command list
 * and creates a simulated 
 * 
 * @param input    [Element] terminal
's input element (usually an input)
 * @param output   [Element] terminal
's output (usually a pre)
 * @param commands [Map]     a map containing all commands and it's outputs
 */
var terminalManager = function (input, output, commands){
    input.addEventListener("keyup", function (event){
        var keyCode = event.keyCode || event.which;
        if (keyCode == '13'){
            parseInput(input.value);
            input.value = "";
        }
    });
    
    function parseInput(command){
        var f = commands.get(command);
        if (typeof f == "undefined") {
            f = commands.get("help");
        }
        var childNode = document.createTextNode(f());
        output.appendChild(childNode);
    }
    
    parseInput("welcome");
};


var commands = new Map();
commands.set("welcome", showWelcome);
commands.set("help", showHelp);
commands.set("contact", showContact);

function showWelcome(param) {
return "Last login: Fri Feb 12 11:55:12 on ttys000 \n";
}

function showHelp(param) {
    return "mon texte\n";
}
    
function showContact(param) {
    return "aaaa";
    //openContactPopup();
}

terminalManager(terminalInput, terminalOutput, commands);

// Drag'n'drop

function drag_start(event) {
    if(event.target.draggable) {
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("text/plain", event.target.id + ',' +
        (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
    }
} 

function drop(event) {
    var data = event.dataTransfer.getData("text/plain").split(',');
    document.getElementById(data[0]).style.left = (event.clientX + parseInt(data[1],10)) + 'px';
    document.getElementById(data[0]).style.top = (event.clientY + parseInt(data[2],10)) + 'px';
    event.preventDefault();
    return false;
}

function drag_over(event) {
    event.preventDefault();
    return false;
} 

document.body.addEventListener('dragstart',drag_start,false);
document.body.addEventListener('dragover',drag_over,false);
document.body.addEventListener('drop',drop,false); 

