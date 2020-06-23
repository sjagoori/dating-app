/* eslint-disable no-unused-vars */

/**
 * Function compares the values of two password input fields.
 * In the case both passwords match, the function returns true, if not a false.
 * @function
 * @return {bool} - true if matches, else false.
 */
function validatePasswords() {
  const x = document.forms['registerForm']['password'];
  const y = document.forms['registerForm']['rpassword'];
  const z = document.getElementById('errorMessage');

  // the error message is created
  const errorMessage = document.createElement('span');
  errorMessage.setAttribute('id', 'errorMessage');
  errorMessage.textContent = 'Password does not match.';
  errorMessage.style.color = '#FF0000';

  if (x.value != y.value) {
    // if the error message doesn't already exist, add. Prevents duplicates.
    if (z == null) {
      y.after(errorMessage);
    }
    // passwords do not match
    return false;
  }
}
