'use strict';

const loginField = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const logoutBtn = document.getElementById('btn-logout');
const welcomeMess = document.getElementById('welcome-message');

/**** DATA ****/
let curUser = JSON.parse(getFromStorage(KEY_CUR, '0'));

/**** FUNCTIONS ****/
function parseUser(userData) {
	const user = new User(userData.firstName, userData.lastName, userData.username, userData.password);
	return user;
}
function toLoginPage() {
  window.location.href = '../pages/login.html';
}

/**** ACTIONS ****/
if(!curUser){
  mainContent.innerHTML = '';
} else {
  curUser = parseUser(curUser);
  loginField.innerHTML = '';
  welcomeMess.textContent = `Welcome ${curUser.firstName}`;
  logoutBtn.addEventListener('click', function(){
    localStorage.removeItem(KEY_CUR);
    toLoginPage();
  })
}

