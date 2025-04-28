document.querySelector('span').addEventListener('click', () => {
    alert(` MovieBoard Terms & Conditions:
            1. You must be 16+ to use this site.
            2. Do not share your password.
            3. We store your watchlist data securely.
        `)
});

document.querySelector('a').addEventListener('click', () => {
    document.querySelector('form').classList.add('blur');
    document.querySelector('article').classList.remove('display');
});

document.querySelector('article span').addEventListener('click', () => {
    document.querySelector('form').classList.remove('blur');
    document.querySelector('article').classList.add('display');
});

let signup = function(email, username, password) {
    fetch('http://localhost:8001/signup', {                                     // posting data to server
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, username, password })
    })
        .then(response => {                                                         // getting response from server
            // console.log(response);
            return response.json();
        })
        .then(data => {
            // console.log(data);
            alert(data.message);
            if (data.message === 'Registered successfully') {
                document.querySelector(`form input[type='email']`).value = '';
                document.querySelector(`form input[type='text']`).value = '';
                document.querySelector(`form input[type='password']`).value = '';        
                document.querySelector(`#age`).checked = false;
                document.querySelector(`#agree`).checked = false;
                localStorage.setItem('user_id', data.user_id);
                window.location.href = "index.html"
            }
        })
        .catch(err => {
            alert('Unable to connect server');
        })
};

document.querySelector('form button').addEventListener('click', (event)=> {
    event.preventDefault();
    let email_value = document.querySelector(`form input[type='email']`).value;
    let username_value = document.querySelector(`form input[type='text']`).value;
    let password_value = document.querySelector(`form input[type='password']`).value;        
    let age_status = document.querySelector(`#age`).checked;
    let agree_status = document.querySelector(`#agree`).checked;   
    if (!email_value.endsWith('@gmail.com')) {
        alert('Invalid Email');
    }
    else if (username_value.length < 4) {
        alert('Username must have atleast 4 characters');
    }
    else if (!/^[a-zA-Z0-9_]+$/.test(username_value)) {
        alert('Username can only contain alphabets, numbers, and underscores');
    }
    else if (password_value.length < 8) {
        alert('Password must have atleast 8 characters');
    }
    else if (!/[^\w\s]/.test(password_value) || !/\d/.test(password_value)) {
        alert('Password must contain at least one symbol and one number');
    }
    else if (age_status === false) {
        alert('Checkbox is mandatory for signup');
    }
    else if (agree_status === false) {
        alert('Checkbox is mandatory for signup');
    }
    else {
        console.log(email_value, username_value, password_value, age_status, agree_status);
        signup(email_value, username_value, password_value);   
    };
});

let login = function(email, password) {
    fetch('http://localhost:8001/login', {                        // posting data to server
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password })
    })    
        .then(response => {
            // console.log(response);
            return response.json();
        })
        .then(data => {
            // console.log(data);
            alert(data.message);
            if (data.message === 'Login successful') {
                document.querySelector(`article input[type='email']`).value = '';
                document.querySelector(`article input[type='password']`).value = ''; 
                localStorage.setItem('user_id', data.user_id);
                window.location.href = "index.html";
            }
        })
        .catch(err => {
            alert('Unable to connect server');
        })
};

document.querySelector('article button').addEventListener('click', () => {
    let login_email = document.querySelector(`article input[type='email']`).value;
    let login_password = document.querySelector(`article input[type='password']`).value;   
    if (!login_email.endsWith('@gmail.com')) {
        alert('Invalid Email');
    }
    else if (login_password.length < 8) {
        alert('Please Enter valid password');
    }
    else {
        console.log(login_email, login_password);
        login(login_email, login_password);
    }
});
