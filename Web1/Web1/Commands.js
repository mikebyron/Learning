
// Trim blank characters from beginning and end of string.
function trimBlanks(str) {
    if (str.length == 0)
        return str;

    for (var firstIndex = 0; firstIndex < str.length; firstIndex++) {
        if (str.charAt(firstIndex) != " ")
            break;
    }

    // If there is nothing but blanks, return an empty string.
    if (firstIndex == str.length)
        return "";

    for (var lastIndex = str.length - 1; lastIndex >= 0; lastIndex--) {
        if (str.charAt(lastIndex) != " ")
            break;
    }

    return str.substring(firstIndex, lastIndex + 1);
}

// Display command feedback.
function commandResult(str) {
    var res = document.getElementById("cmdResult");
    res.innerHTML = str;
}

// Process a command with arguments.
function processCommand(cmd, args) {
    switch (cmd) {
        case "l":
            if (args.search("//") == -1)
                args = "http://" + args;
            var iframe = document.getElementById("myFrame");
            iframe.src = args;
            commandResult("Loaded URL: " + args);
            break;
        case "e":
            var func = executeCommand;
            var temp = "";
            for (var x in executeCommand)
                temp += "|" + x;
            commandResult(temp);
            break;
        default:
            commandResult("Unknown command: " + cmd);
            return;
    }
}

// Do a command.
function executeCommand() {
    var text = document.getElementById("commandText").value;

    var trimmedText = trimBlanks(text);

    if (trimmedText.length == 0) {
        commandResult("No command");
        return;
    }

    var cmd = trimmedText;
    var args = "";
    var blankIndex = cmd.search(" ");
    if (blankIndex != -1) {
        cmd = trimmedText.substr(0, blankIndex);
        for (; blankIndex < trimmedText.length; blankIndex++) {
            if (trimmedText.charAt(blankIndex) != " ")
                break;
        }
        args = trimmedText.substring(blankIndex);
    }

    processCommand(cmd, args);
}