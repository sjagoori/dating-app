/**
 * Creates commandlist and populates it according to user input
 * @function
 */
function showCommandList() {
  const input = document.getElementById('command-input');
  const inputValue = input.value;
  const commandList = getCommandList();
  const listElement = document.getElementById('auto-complete');
  listElement.innerHTML = '';
  for (const [key, value] of Object.entries(commandList)) {
    if (key.includes(inputValue)) {
      addListItem(key, value);
    }
  }
  /**
   * Creates commandlist and populates it according to user input
   * @function
   * @param {string} key Command title.
   * @param {object} value Command value.
   */
  function addListItem(key, value) {
    listItem = document.createElement('li');
    let commandPrototype = key;
    for (argument of value.arguments) {
      commandPrototype += ' {' + argument.label + '}';
    }
    listItem.innerHTML = '/' + commandPrototype;
    listItem.id = key;
    listItem.onmousedown = setValue;
    listElement.appendChild(listItem);
    /**
     * Sets own value to input box
     * @function
     */
    function setValue() {
      input.value = key + ' ';
      // Won't work without timeout
      window.setTimeout(function() {
        input.focus();
      }, 0);
    }
  }
}

/**
 * Empties commandlist in html
 * @function
 */
function hideCommandList() {
  const listElement = document.getElementById('auto-complete');
  listElement.innerHTML = '';
}
