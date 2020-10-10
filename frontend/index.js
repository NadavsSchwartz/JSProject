window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    userInput()
});

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

}