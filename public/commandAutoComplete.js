/**
 * Creates commandlist and populates it according to user input
 * @function
 */
function showCommandList() {
  const input = document.getElementById('command-input');
  const inputValue = input.value
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
    listItem.innerHTML = '/' + key;
    listItem.id = key;
    listElement.appendChild(listItem);
    document.getElementById(key).onmousedown = setValue;
    /**
     * Sets own value to input box
     * @function
     */
    function setValue() {
      let newValue = key;
      for (argument of value.arguments) {
        newValue += ' <' + argument.label + '>';
      }
      input.value = newValue;
      showCommandList();
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
