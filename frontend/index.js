window.addEventListener('DOMContentLoaded', (event) => {
    hideElems()
    loggedIn()
    userInput()
});

function hideElems() {
    // const inputField = document.querySelector('form');
    // inputField.style.display = "none";
    const signUpForm = document.getElementById('SignUpForm');
    signUpForm.style.display = "none";
    const loginForm = document.getElementById('loginForm')
    loginForm.style.display = "none";
}

function userInput() {
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputField = document.querySelector('input[id="search"]');
        validateInput(inputField.value)
    })
}

function validateInput(data) {
    if (data.length > 15)
        return alert('search can not contain more than 15 characters')
    else
        newApp(data)
}

function newApp(data) {
    const app = new App();
    app.getProducts(data)
}

function login() {
    const loginForm = document.getElementById('loginForm');
    const signUpForm = document.getElementById('SignUpForm');
    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        signUpForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
    }
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userEmail = document.getElementById('loginEmail');
        fetch("http://localhost:3000/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        email: this.email,
                    },
                }),
            })
            .then((res) => {
                res.json()
                debugger;
                if (res.ok) {
                    return res;
                } else {
                    alert(`Request rejected with status ${res.status}`)
                    throw Error(`Request rejected with status ${res.status}`);
                }
            })

    })
}

function signUp() {
    const signUpForm = document.getElementById('SignUpForm');
    const loginForm = document.getElementById('loginForm');
    if (signUpForm.style.display === "none") {
        signUpForm.style.display = "block";
        loginForm.style.display = "none";
    } else {
        signUpForm.style.display = "none";
    }
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userName = document.getElementById('signUpName');
        const userEmail = document.getElementById('signUpEmail');
        const newUser = new User(userEmail.value, userName.value);
        newUser.save()
    })
}