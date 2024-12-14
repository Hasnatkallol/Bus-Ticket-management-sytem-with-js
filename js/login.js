// Valid password and emlail
const validEmail = "hk@gmail.com";
const validPassword = "12345";


document.getElementById('loginForm').addEventListener('submit',function(e) {
    e.preventDefault();

    // Take input and password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');


    // Matching Password and Email

    if(validEmail === email && validPassword === password){
        errorMessage.style.color='green';
        errorMessage.textContent = 'Login Successfully'
        setTimeout(() =>{ 
            window.location.href ="home.html"
        },1000)
    }
    else{
         errorMessage.style.color='red';
         errorMessage.textContent = 'Invalid Email or Password'
    }
});



