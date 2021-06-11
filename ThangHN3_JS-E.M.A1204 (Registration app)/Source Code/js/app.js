var formUser = document.querySelector(".form");
var toast__user = document.querySelector("#Toast__user");
var toast__password = document.querySelector("#Toast__password");
var toast__checkPassword = document.querySelector("#Toast__checkPassword");
var btn_submit = document.querySelector("#submit");
var green_info = document.querySelector(".green_info");
var data = {
  user: "",
  password: "",
  checkPassword: "",
  checkSubmit: {
    user: false,
    password: false,
    checkPassword: false,
  },
};
console.log(data);
function checkData(e) {
  var type = e.target.getAttribute("class");
  switch (type) {
    case "user":
      data.user = e.target.value;
      break;
    case "password":
      data.password = e.target.value;
      break;
    case "checkPassword":
      data.checkPassword = e.target.value;
      break;
  }
}
function submitForm() {
  var btnSubmit = data.checkSubmit;
  if (data.user === "") {
    toast__user.innerHTML = "Username is required";
    btnSubmit.user = false;
  } else {
    btnSubmit.user = true;
  }
  if (data.password === "") {
    toast__password.innerHTML = "Password is required";
    btnSubmit.password = false;
  } else {
    btnSubmit.password = true;
  }
  if (data.checkPassword === "") {
    toast__checkPassword.innerHTML = "Confirm password is required";
    btnSubmit.checkPassword = false;
  } else if (data.checkPassword != data.password) {
    toast__checkPassword.innerHTML =
      "Password and confirm password do not match";
    btnSubmit.checkPassword = false;
  } else {
    btnSubmit.checkPassword = true;
  }
  if (
    btnSubmit.user == true &&
    btnSubmit.password == true &&
    btnSubmit.checkPassword == true
  ) {
    green_info.innerHTML = "You have registered successfully";
  }
}
formUser.addEventListener("change", checkData);
btn_submit.addEventListener("click", submitForm);
