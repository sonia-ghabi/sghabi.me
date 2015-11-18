var console = document.getElementById("terminal");
var consoleInput = document.getElementById("terminalCommand"); 
var consoleOutput = document.getElementById("terminalDisplay");

console.addEventListener("click", function(event){
    consoleInput.focus();
});
    
/**
 * This object takes an input element, an output elements and a command list
 * and creates a simulated 
 * 
 * @param input    [Element] console's input element (usually an input)
 * @param output   [Element] console's output (usually a pre)
 * @param commands [Map]     a map containing all commands and it's outputs
 */
var consoleManager = function (input, output, commands){
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
return "██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗\n"+
"██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝\n"+
"██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗\n"+  
"██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝\n"+  
"╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗\n"+
" ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝\n";
}

function showHelp(param) {
    return "mon texte\n";
}
    
function showContact(param) {
    //openContactPopup();
}

consoleManager(consoleInput, consoleOutput, commands);