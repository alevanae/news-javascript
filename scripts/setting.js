'use strict';

const pageSize = document.getElementById('input-page-size');
const category = document.getElementById('input-category');
const btnSubmit = document.getElementById('btn-submit');

/**** DATA ****/
const setting = JSON.parse(getFromStorage(KEY_SET, '[]'))
const curUser = JSON.parse(getFromStorage(KEY_CUR, '0'));

/**** FUNCTIONS ****/
function viewOldSetting() {
  for(const user of setting) {
    if(user.username === curUser.username){
      pageSize.value = user.pageSize;
      category.value = user.category;
    }
  }
}
function validate({username, pageSize, category}){
  if(pageSize <= 0 || pageSize > 99){
    alert('Page size has as least 1 page and less than 100 pages!');
    return false;
  }
  return true;
}

/**** ACTIONS ****/
btnSubmit.addEventListener('click', function() {
  const data = {
    username: curUser.username,
    pageSize: Number(pageSize.value),
    category: category.value,
  }
  if(validate(data)){
    for(let i = 0; i < setting.length; i++){
      if(setting[i].username === data.username) {
        setting.splice(i, 1);
      }
    }
    setting.push(data);
    saveToStorage(KEY_SET, JSON.stringify(setting));
    alert('Your setting has changed!')
  }
})
viewOldSetting();