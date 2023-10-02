'use strict';

const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');

/**** DATA ****/
let todoArr = JSON.parse(getFromStorage(KEY_TO_DO, '[]'));
todoArr = todoArr.map(item => parseTodo(item))
let curUser = JSON.parse(getFromStorage(KEY_CUR, '0'));
curUser = parseUser(curUser);

/**** FUNCTIONS ****/
function parseTodo(item) {
  const user = new Task(item.task, item.owner, item.isDone);
	return user
}
function validate({task, owner, isDone}){
  if(!task){
    alert('You must write your task!');
    return false;
  }
  return true;
}
function renderToDo(todoArr) {
  todoList.innerHTML = '';
  for(let i = 0; i < todoArr.length; i++){
    if(todoArr[i].owner === curUser.username) {
      const task = document.createElement('li');
      task.innerHTML = `
      ${todoArr[i].task}
      <span class="close" onclick="deleteTask(${i})">×</span>`
      if(todoArr[i].isDone) task.classList.add('checked');
      todoList.appendChild(task);
      task.setAttribute('onclick', `doneTaskOrNot(${i})`)
    }
  }
}
function doneTaskOrNot(i){
  todoArr[i].isDone = todoArr[i].isDone ? false : true;
  saveToStorage(KEY_TO_DO, JSON.stringify(todoArr));
  renderToDo(todoArr);
}
function deleteTask(i) {
  todoArr.splice(i, 1);
  renderToDo(todoArr);
  saveToStorage(KEY_TO_DO, JSON.stringify(todoArr));
}
function addTask() {
  const data = new Task(inputTask.value, curUser.username, false);
  if(validate(data)){
    todoArr.push(data);
    saveToStorage(KEY_TO_DO, JSON.stringify(todoArr));
    renderToDo(todoArr);
  }
  inputTask.value = '';
}

/**** ACTIONS ****/
renderToDo(todoArr);
btnAdd.addEventListener('click', addTask)
document.addEventListener('keydown', function(e) {
  if(e.key === 'Enter') addTask();
})

