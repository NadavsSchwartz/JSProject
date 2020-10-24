class User {
    constructor(email, name, id = null, products = []) {
        this.email = email;
        this.name = name;
        this.id = id;
        this.products = products.map(p => {
            p.ASIN = p.asin
            p.imageUrl = p.imageurl
            p.detailsUrlPage = p.detailpageurl
            p.totalReviews = p.totalreviews
            return new Product(p);
        })
    }

    displayProducts() {
        let div = document.createElement('div')
        if (user.products.length > 0) {
            user.products.forEach((product) => {
                const productSection = document.getElementById('userProducts');
                div.innerHTML = `
        <div class="card horizontal">
            <div class="card-image">
                <img src=${product.img}>
            </div>

            <div class="card-stacked">
                <div class = "card-content">
                <span class = "card-title"> ${product.title} </span> 
                <p> ${product.rating} rating, ${product.totalReviews} reviews </p>
                <span> Price:${product.price}</span>
            </div>

            <div class="card-action">
                <button class="btn delete">delete</button> 
            </div>

        </div> 
        `
                productSection.appendChild(div);
                div.querySelector('.delete').addEventListener('click', user.delete.bind(product))
            })
        } else {
            const productSection = document.getElementById('userProducts');
            productSection.innerHTML = `You currently have no products in your profile.`
        }
    }

    delete() {
        user.products.filter(product => product.asin !== this.asin)
        fetch(`http://localhost:3000/users/${this.user_id}/products/${this.asin}`, {
                method: "DELETE",
            })
            .then((res) => {
                if (res.ok) {
                    alert('Deleted successfuly');
                } else {
                    alert(`Request rejected with status ${res.status}`)
                    throw Error(`Request rejected with status ${res.status}`);
                }
            })
    }

    save() {
        fetch("http://localhost:3000/users", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        email: this.email,
                        name: this.name,
                    },
                }),
            })
            .then((res) => {
                res.json()
                if (res.ok) {
                    return res;
                } else {
                    alert(`Request rejected with status ${res.status}`)
                    throw Error(`Request rejected with status ${res.status}`);
                }
            })
            .then((info) => {
                if (info.errors) {
                    alert(info.errors);
                } else {
                    this.id = info.id
                    alert(`Succes. Thanks for signing up ${this.name}`)

                }
            });
    }
}