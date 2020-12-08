"use strict";

const registerUser = document.querySelector("#registerUser"),
  login = document.querySelector("#login"),
  username = document.querySelector("#username"),
  list = document.querySelector("#list");

const userData = [
];

function render() {
  list.textContent = "";
  userData.forEach(function (item,i) {
    const li = document.createElement("li");
    li.innerHTML = `Имя: ${item.firstName}, Фамилия: ${item.lastName}, загерестрирован: ${item.regDate}  <button id="remove">Удалить</button>`;
    list.append(li);

    const remove = li.querySelector("#remove");
    remove.addEventListener("click", function () {
      li.remove();
      userData.splice(i, 1);
      render();
    });
  });

  localStorage.setItem("userData", JSON.stringify(userData));
}

function getPrompt(message, item) {
  let result = prompt(message);
  if(result !== null){
    if (result.split(" ").length - 1 > 0 || result.trim() === "") {
      getPrompt(`Введите ${item}, он должен быть без пробелов`, item);
    }
    return result;
  }
}

function getUser() {
  let name = prompt("Введите через пробел Имя и Фамилию");
  if (name === null || name.split(" ").length - 1 > 1 || name.trim() === "") {
    alert("Ошибка");
    return;
  } else {
    name = name.split(" ");
  }
  let login = getPrompt("Введите логин", "логин");
  let password = getPrompt("Введите пароль", "пароль");
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  let date = new Date().toLocaleString("ru", options);
  
  let user = {
    firstName: name[0],
    lastName: name[1],
    login: login,
    password: password,
    regDate: date,
  };
  userData.push(user);
  
  render();
}
function getLogin(){
  let login = getPrompt("Введите логин", "логин");
  let password = getPrompt("Введите пароль", "пароль");
  let text = 'Аноним';
  userData.forEach(function (item) {  
    if(item.login === login && item.password === password){
      text = item.firstName;
    }
  });
  if(text === 'Аноним'){
    alert('Пользователь не найдет');
    username.textContent = text;
  }else {
    username.textContent = text;
  }
}
let storedData = JSON.parse(localStorage.getItem("userData"));
storedData.forEach(function (item) {
  userData.push(item);
});
render();
registerUser.addEventListener("click", getUser);
login.addEventListener('click', getLogin);
