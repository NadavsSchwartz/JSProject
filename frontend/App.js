class App {
    constructor() {
        this.products = []

    }

    getProducts(data) {
        let user_id;
        if (userEmail !== undefined) {
            fetch("http://localhost:3000/find", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: `${userEmail}`
                    }),
                })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        alert(`Request rejected with status ${res.status}`)
                        throw Error(`Request rejected with status ${res.status}`);
                    }
                })
                .then((info) => {
                    user_id = info.id
                    return console.log('success', info.id, user_id)
                })
        } else {
            alert('please Log in first.')
            throw Error('please Log in first.')
        }
        fetch(`https://amazon-price1.p.rapidapi.com/search?keywords=${data}&marketplace=US`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "amazon-price1.p.rapidapi.com",
                    "x-rapidapi-key": "04ffdca11fmsh6d2319daea4c209p172278jsn9b371a9115f8"
                }
            })
            .then((r) => r.json())
            .then((info) => {
                info.forEach((p) => {

                    p.id = user_id;
                    const product = new Product(p)
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
}