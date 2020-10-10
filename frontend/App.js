class App {
    constructor() {
        this.products = []

    }

    getProducts(data) {
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
                    this.products.push(p)
                    const product = new Product(p)
                })
            })

        .catch(err => {
            console.log(err);
        });
    }
}