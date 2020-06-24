const form = document.forms['registerForm'];
form.addEventListener('submit', (e) =>{
  validatePasswords(e);
});

/**
 * Function compares the values of two password input fields.
 * In the case both passwords match, the function returns true, if not a false.
 * @function
 * @param {ClickEvent} event
 * @return {bool} - true if matches, else false.
 */
function validatePasswords(event) {
  const x = document.forms['registerForm']['password'];
  const y = document.forms['registerForm']['rpassword'];
  const z = document.getElementById('errorMessage');

  // the error message is created
  const errorMessage = document.createElement('span');
  errorMessage.setAttribute('id', 'errorMessage');
  errorMessage.textContent = 'Password does not match.';
  errorMessage.style.color = '#FF0000';

  if (x.value != y.value) {
    event.preventDefault();
    // if the error message doesn't already exist, add. Prevents duplicates.
    if (z == null) {
      y.after(errorMessage);
    }
    // passwords do not match
    return false;
  }
}
