/* eslint-disable no-unused-vars */

/**
 * Function checks if there is at least one checkbox selected in the form.
 * @function
 * @return {bool} - true if at least one checkbox/radio is selected, else false
 */
function validateForm() {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  const radioButtons = document.querySelectorAll('input[type=radio]');
  const inputBox = document.getElementsByClassName('c-login__input-container')[0];
  const z = document.getElementById('errorMessage');

  let cCounter = 0;
  let rCounter = 0;

  // the error message is created
  const errorMessage = document.createElement('span');
  errorMessage.setAttribute('id', 'errorMessage');
  errorMessage.textContent = 'Select at least one option for all questions.';
  errorMessage.style.color = '#FF0000';

  // checks is checkbox is selected, if not counter goes up.
  checkboxes.forEach((i) => {
    return !i.checked ? cCounter++ : true;
  });

  // checks is radio is selected, if not counter goes up.
  radioButtons.forEach((i) => {
    return !i.checked ? rCounter++ : true;
  });

  // if the error message doesn't already exist, add. Prevents duplicates.
  if (cCounter > 0 && z == null && rCounter > 4 && z == null) {
    inputBox.after(errorMessage);
  }

  // if the counter is higher than 5, nothing is selected
  return rCounter < 5 && cCounter < 5 ? true : false;
}
