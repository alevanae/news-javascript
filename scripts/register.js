"use strict";

const firstName = document.getElementById("input-firstname");
const lastName = document.getElementById("input-lastname");
const username = document.getElementById("input-username");
const password = document.getElementById("input-password");
const passwordConfirm = document.getElementById("input-password-confirm");
const regBtn = document.getElementById("btn-submit");

/**** DATA ****/
let userArr = [];
try {
  userArr = JSON.parse(getFromStorage(KEY));
  userArr.map((user) => parseUser(user));
} catch (error) {
  console.log(error);
}

/**** FUNCTIONS ****/

function validateData(
  { firstName, lastName, username, password },
  passwordConfirm
) {
  if (!firstName) {
    alert(`Don't forget your first name!`);
    return false;
  }
  if (!lastName) {
    alert(`Don't forget your last name!`);
    return false;
  }
  if (!username) {
    alert(`Don't forget your username!`);
    return false;
  }
  if (password <= 8) {
    alert(`Your pass must have at least 8 character!`);
    return false;
  }
  if (password !== passwordConfirm) {
    alert(`Wrong password confirm!! Please try again!`);
    return false;
  }
  return true;
}
function getUser({ firstName, lastName, username, password }) {
  return new User(firstName, lastName, username, password);
}
function addUser(user) {
  userArr.push(user);
}
function toLoginPage() {
  window.location.href = "../pages/login.html";
}

/**** ACTION ****/
regBtn.addEventListener("click", function (e) {
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    password: password.value,
  };
  const confirm = passwordConfirm.value;
  if (validateData(data, confirm)) {
    const user = getUser(data);
    addUser(user);
    saveToStorage(KEY, JSON.stringify(userArr));
    toLoginPage();
  }
});
