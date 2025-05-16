const form = document.getElementById('form')
const username_input = document.getElementById('username-input')
const email_input = document.getElementById('email-input')
const phone_input = document.getElementById('phone-input')
const enroll_input = document.getElementById('enroll-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

let users = []
if(localStorage.getItem('users') != null){
  // If we have users in local storage then we parse them
  users = JSON.parse(localStorage.getItem('users'))
}


form.addEventListener('submit', (e) => {
  let errors = [];
  if (username_input) {
    // If we have a username input, we are in the signup
    errors = getSignupFormErrors(
      username_input.value,
      email_input.value,
      phone_input.value,
      enroll_input.value,
      password_input.value,
      repeat_password_input.value
    );
  } else {
    // If we don't have a username input, we are in the login
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if (errors.length > 0) {
    // If there are any errors
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  } else {
    // Call loginUser if no errors
    if(window.location.pathname.slice(-11) == 'signup.html'){
      // If we are in the signup page
      const userData = {
        username: username_input.value,
        email: email_input.value,
        phoneNumber: phone_input.value,
        enroll: enroll_input.value,
        password: password_input.value,
      };
      const registerSuccess = registerUser(userData);
      if (registerSuccess) {
        localStorage.setItem('users', JSON.stringify(users))
        window.location.href = "index.html";
      } else {
        e.preventDefault(); // Prevent form submission if registration fails
      }
    }else if(window.location.pathname.slice(-10) == 'login.html'){
      // If we are in the login page
      const userData = {
        email: email_input.value,
        password: password_input.value,
      };
      console.log("User data:", userData);
      const loginSuccess = loginUser(userData);
      e.preventDefault(); // Always prevent default for SPA-like behavior
      if (loginSuccess) {
        window.location.href = "index.html";
      }
      else{
        // Redirect to the index page if login is successful
        e.preventDefault(); // Prevent form submission if login fails
        window.location.href = "index.html";

      }
    }
    else{
      console.log('Unknown page');
    }
  }
})

function getSignupFormErrors(username, email, phoneNumber, enroll, password, repeatPassword,){
  let errors = []

  if(username === '' || username == null){
    errors.push('username is required')
    username_input.parentElement.classList.add('incorrect')
  }
  if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password.length < 8){
    errors.push('Password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password !== repeatPassword){
    errors.push('Password does not match repeated password')
    password_input.parentElement.classList.add('incorrect')
    repeat_password_input.parentElement.classList.add('incorrect')
  }
  if(phoneNumber === '' || phoneNumber == null){
    errors.push('Phone number is required')
    phone_input.parentElement.classList.add('incorrect')
  }
  if(phoneNumber.length < 10){
    errors.push('Phone number must have at least 10 digits')
    phone_input.parentElement.classList.add('incorrect')
  }
  if(phoneNumber.length > 12){
    errors.push('Phone number must have at most 12 digits')
    phone_input.parentElement.classList.add('incorrect')
  }
  if(!(String(phoneNumber)[0] == 6 ||
     String(phoneNumber)[0] == 7 ||
     String(phoneNumber)[0] == 8 ||
     String(phoneNumber)[0] == 9)){
    errors.push('Phone number must start with 6, 7, 8 or 9')
    phone_input.parentElement.classList.add('incorrect')
  }
  if(enroll.length != 11){
    errors.push('Enrollment number must be 11 digits')
    enroll_input.parentElement.classList.add('incorrect')
  }

  return errors;
}

function getLoginFormErrors(email, password){
  let errors = []

  if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors;
}

function registerUser(userData){
  // Check if the user already exists
  const userExists = users.find(user => user.email === userData.email)
  if(userExists){
    error_message.innerText = 'User already exists'
    email_input.parentElement.classList.add('incorrect')
    return false
  }
  else{
    // Add the user to the users array
    users.push(userData)
    localStorage.setItem('users', JSON.stringify(users))
    return true
  }
}

function loginUser(userData) {
  console.log("Attempting login with:", userData);
  console.log(userData);
  const user = users.find(
    (user) =>
      user.email === userData.email && user.password === userData.password
  );
  if (user) {
    console.log("Login successful, redirecting...");
    // window.location.href = "index.html";
    return true;
  } else {
    console.log("Login failed: Invalid email or password");
    error_message.innerText = "Invalid email or password";
    email_input.parentElement.classList.add("incorrect");
    password_input.parentElement.classList.add("incorrect");
    return false;
  }
}

const allInputs = [username_input, email_input, phone_input, enroll_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})