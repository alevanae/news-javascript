'use strict';

const loginBtn = document.getElementById('btn-submit');
const username = document.getElementById('input-username');
const password = document.getElementById('input-password');

/**** DATA ****/
const userArr = JSON.parse(getFromStorage(KEY));
userArr.map(user => parseUser(user));

/**** FUNCTIONs ****/
function parseUser(userData) {
	const user = new User(userData.firstName, userData.lastName, userData.username, userData.password)

	return user
}
function validUser({username, password}){
  return userArr.filter(user => user.username === username && user.password === password);
}
function toHomePage() {
  window.location.href = '../index.html';
}

/**** ACTIONS ****/
loginBtn.addEventListener('click', function() {
  const data = {
    username: username.value,
    password: password.value
  }
  // const [indexOfUser] = userArr.filter(user => user.username === data.username && user.password === data.password);
  if(validUser(data)){
    const [curUser] = validUser(data);
    saveToStorage(KEY_CUR, JSON.stringify(curUser));
    toHomePage();
  } else {
    alert(`Your username or password is wrong!`)
  }
 
})


