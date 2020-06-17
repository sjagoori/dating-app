/* eslint-disable no-unused-vars */
/**
 * Creates commandlist and populates it according to user input
 * @function
 */
function showCommandList() {
  /* eslint-enable no-unused-vars */
  const input = document.getElementById('command-input');
  const inputValue = input.value.split(' ');
  const inputCommand = inputValue.slice(0, 1)[0];
  const inputArgs = inputValue.slice(1);
  const commandList = getCommandList();
  const listElement = document.getElementById('auto-complete');
  listElement.innerHTML = '';
  for (const [command, commandObject] of Object.entries(commandList)) {
    if (command.includes(inputCommand)) {
      // Create command prototype
      const commandPrototype = [command];
      for (argument of commandObject.arguments) {
        commandPrototype.push('{' + argument.label + '}');
      }
      // If command is fully entered, suggest arguments
      if (command === inputCommand && inputArgs.length > 0) {
        // Loop through every argument the command has
        const arguments = commandObject.arguments;
        for ([i, argument] of arguments.entries()) {
          let valueList = argument.values;
          const previousArgument = arguments[i-1];
          const previousInputArgs = inputArgs[i-1];
          if (argument.dependant) {
            valueList = valueList[previousArgument.values.indexOf(previousInputArgs)];
          }
          if (valueList) {
            for (value of valueList) {
              // If value for argument hasn't been given, suggest values
              if (inputArgs[i] !== undefined && inputArgs[i] !== value) {
                // If it is the first argument or the previous argument has a correct value
                if (i === 0 || previousArgument.values.includes(previousInputArgs)) {
                  if (value.includes(inputArgs[i])) {
                    commandPrototype[i+1] = value;
                    addListItem(commandPrototype);
                  }
                }
              } else {
                commandPrototype[i+1] = value;
              }
            }
          }
        }
      } else {
        addListItem(commandPrototype);
      }
    }
  }
  /**
   * Creates commandlist and populates it according to user input
   * @function
   * @param {string} commandPrototype Command prototype to display.
   */
  function addListItem(commandPrototype) {
    const listItem = document.createElement('li');
    let commandPrototypeValue = commandPrototype.slice(0, inputArgs.length + 1).join(' ');
    // Add a space after value if it's not the last argument
    if (commandPrototype.length !== inputArgs.length + 1) commandPrototypeValue += ' ';
    listItem.innerHTML = '/' + commandPrototype.join(' ');
    listElement.appendChild(listItem);
    listItem.onmousedown = setValue;
    /**
     * Sets own value to input box
     * @function
     */
    function setValue() {
      input.value = commandPrototypeValue;
      // Won't work without timeout
      window.setTimeout(function() {
        input.focus();
      }, 0);
    }
  }
}

/* eslint-disable no-unused-vars */
/**
 * Empties commandlist in html
 * @function
 */
function hideCommandList() {
  /* eslint-enable no-unused-vars */
  const listElement = document.getElementById('auto-complete');
  listElement.innerHTML = '';
}
