const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')
const phone_input = document.getElementById('phone-input')

form.addEventListener('submit', (e) => {
  let errors = []
  if(firstname_input){
    // If we have a firstname input then we are in the signup
    errors = getSignupFormErrors(firstname_input.value, email_input.value, phone_input.value, password_input.value, repeat_password_input.value)
  
  }
  else{
    // If we don't have a firstname input then we are in the login
    errors = getLoginFormErrors(email_input.value, password_input.value)
  }

  if(errors.length > 0){
    // If there are any errors
    e.preventDefault()
    error_message.innerText  = errors.join(". ")
  }
})

function getSignupFormErrors(firstname, email, phoneNumber, password, repeatPassword,){
  let errors = []

  if(firstname === '' || firstname == null){
    errors.push('Firstname is required')
    firstname_input.parentElement.classList.add('incorrect')
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

const allInputs = [firstname_input, email_input, phone_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})