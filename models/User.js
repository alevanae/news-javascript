'use strict';

class User{
  //private field
  
  constructor(firstName, lastName, username, password, setting) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.setting = setting;
  }
}

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

/**** DATA ****/
const KEY = "USER_ARRAY";
const KEY_CUR = "CUR_USER";
const KEY_TO_DO = 'todoArr';
const KEY_SET = 'setting'
const API_KEY = '53ca57338a7d42b4b1d107ff106c281d';


async function getNews(url) {
  const request = await fetch(url);
  return request.json(); 
}

function parseUser(userData) {
	const user = new User(userData.firstName, userData.lastName, userData.username, userData.password)
	return user
}
