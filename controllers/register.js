import {User} from "../models/product.js"

function validateFormInput() {
  let isValid = document.getElementById("registerForm").checkValidity();
  console.log(isValid);
  if (!isValid) {
    let emailInput = document.getElementById("email");
    let emailWarming = document.getElementById("emailWarming");
    if (emailInput.validity.valueMissing) {
      emailWarming.innerHTML = "Email không được để trống";
      emailWarming.style.display = "block";
    } else if (emailInput.validity.patternMismatch) {
      emailWarming.innerHTML = "Email sai định dạng";
      emailWarming.style.display = "block";
    } else {
      emailWarming.innerHTML = "";
      emailWarming.style.display = "none";
    }
    let passwordInput = document.getElementById("password");
    let passWarming = document.getElementById("passwordWarming");
    if (passwordInput.validity.valueMissing) {
      passWarming.innerHTML = "password không được để trống";
      passWarming.style.display = "block";
    } else {
      passWarming.innerHTML = "";
      passWarming.style.display = "none";
    }
    let confirmedpasswordInput = document.getElementById("confirmedPassword");
    let confirmedWarming = document.getElementById("confirmedWarming");
    if (confirmedpasswordInput.validity.valueMissing) {
      confirmedWarming.innerHTML =
        "xác nhận mật khẩu password không được để trống";
      confirmedWarming.style.display = "block";
    } else if (confirmedpasswordInput.value != passwordInput.value) {
      onfirmedWarming.innerHTML = "xác nhận mật khẩu password không đúng";
      confirmedWarming.style.display = "block";
    } else {
      confirmedWarming.innerHTML = "";
      confirmedWarming.style.display = "none";
    }
    let phoneInput = document.getElementById("phone");
    let phoneWarming = document.getElementById("phoneWarming");
    if (phoneInput.validity.valueMissing) {
      phoneWarming.innerHTML = "Số điện thoại không được để trống";
      phoneWarming.style.display = "block";
    } else {
      phoneWarming.innerHTML = "";
      phoneWarming.style.display = "none";
    }

    let name = document.getElementById("name");
    let nameWarming = document.getElementById("nameWarming");
    if (name.validity.valueMissing) {
      nameWarming.innerHTML = "Tên không được để trống";
      nameWarming.style.display = "block";
    } else {
      nameWarming.innerHTML = "";
      nameWarming.style.display = "none";
    }
    let gen = document.querySelector('input[name="gender"]:checked');
    let genWarming = document.getElementById("genWarming");
    if (!gen) {
      genWarming.innerHTML = "Giới tính không được để trống";
      genWarming.style.display = "block";
    } else {
      genWarming.innerHTML = "";
      genWarming.style.display = "none";
    }
  }

  return isValid;
}

export function registerForm(event) {
  event.preventDefault();
  let isValid = validateFormInput();
  if (!isValid) return

  let formInfo = document.querySelectorAll(
    "#registerForm input"
  );
  
  let newUser = new User();
  let gen = document.querySelector('input[name="gender"]:checked').value;
  if (gen.toLowerCase() == "male") {
    newUser.gender = true
  }else if (gen.toLowerCase() == "female"){
    newUser.gender  = false
  }else{
    return alert("invalid gender !")
  }
  for (let input of formInfo) {
    let {id} = input;
    if (id == "male" ||  id == "female" || id == "confirmedPassword"){
        continue
    }
    newUser[id] = input.value.toString();
  }
  document.querySelector("#registerForm").style.display = "none"
  document.querySelector('.loading').style.display = 'block';
  var mess = '';

  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    method: 'POST',
    data: newUser // {}:object format backend
    });
  
  promise.then(function (result) {
    
    let {message}  = result.data
    alert(message);
    console.log(result.data);
    // document.querySelector('.loading').style.display = 'none'
    document.querySelector('#registerMessage').innerHTML = message;
    document.querySelector('#registerMessage').style.color = 'green'
    document.querySelector('#homePage').style.display = 'block'
    document.querySelector('#homePage').style.color = 'green'
  })

  promise.catch(function (error) {
    alert(error.message)
    document.querySelector('#registerMessage').innerHTML = "Tên đăng nhập đã tồn tại";
    document.querySelector('#registerMessage').style.color = 'red'
  })
}

document.getElementById("submitBtn").onclick = (e)=>{
  registerForm(e)
}