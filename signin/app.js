class User {
    constructor(username, password) {
        this.username = username;
        this.password = password; // In real apps, never store plaintext passwords
    }

    static saveUser(user) {
        localStorage.setItem(user.username, JSON.stringify(user));
    }

    static getUser(username) {
        const userData = localStorage.getItem(username);
        return userData ? JSON.parse(userData) : null;
    }
}

function signup() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const user = new User(username, password);
    User.saveUser(user);
    // Simulate JWT token generation
    const fakeToken = `JWT-${Math.random().toString(36).substr(2)}`;
    localStorage.setItem('token', fakeToken); // Store token
    alert('Signup successful! You are now redirected to sign in.');
    window.location.href = 'signin.html'; // Redirect to sign in page
}

function signin() {
    const username = document.getElementById('signinUsername').value;
    const password = document.getElementById('signinPassword').value;
    const user = User.getUser(username);

    if (user && user.password === password) {
        alert('Signin successful!');
        // Redirect to another page or show logged in state
    } else {
        alert('Signin failed. Incorrect username or password.');
    }
}

// Determine which page we're on and set the correct function to run on button click
if (window.location.pathname.includes('signup.html')) {
    document.querySelector('button').onclick = signup;
} else if (window.location.pathname.includes('signin.html')) {
    document.querySelector('button').onclick = signin;
}
