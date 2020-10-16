class Product {
    constructor({
        ASIN,
        title,
        price,
        imageUrl,
        detailPageURL,
        rating,
        totalReviews,
        user_id,
    }) {
        this.asin = ASIN;
        this.title = title;
        this.price = price;
        this.img = imageUrl;
        this.detailPageURL = detailPageURL;
        this.rating = rating;
        this.totalReviews = totalReviews;
        this.user_id = user_id
    }

    display() {
        const productDiv = document.getElementById('products');
        productDiv.innerHTML += `
        <div class="card horizontal">
            <div class="card-image">
                <img src=${this.img}>
            </div>

            <div class="card-stacked">
                <div class = "card-content">
                <span class = "card-title"> ${this.title} </span> 
                <p> ${this.rating} rating, ${this.totalReviews} reviews </p>
                <span> Price:${this.price}</span>
            </div>

            <div class="card-action">
                <a class="btn" href=${this.detailPageURL}>Details</a> 
                <a class="btn" id="trackProduct">Track</a> 
            </div>

        </div> 
        `
        const trackProduct = document.querySelectorAll("[id^='trackProduct']")
        for (const product of trackProduct) {
            product.addEventListener('click', () => {
                fetch(`http://localhost:3000/users/${user.id}/products`, {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            product: {
                                asin: this.asin,
                                title: this.title,
                                price: this.price,
                                imageurl: this.img,
                                detailpageurl: this.detailPageURL,
                                rating: this.rating,
                                totalreviews: this.totalReviews,
                            },
                        }),
                    })
                    .then((r) => r.json())
                    .then((info) => {
                        if (info.errors) {
                            console.log(info.errors);
                        } else {
                            p.ASIN = p.asin
                            p.imageUrl = p.imageurl
                            p.detailsUrlPage = p.detailpageurl
                            p.totalReviews = p.totalreviews
                            user.products.push(new Product(info))
                            console.log('success')
                        }
                    });
                product.remove()
                    // userProducts(product)
            })
        }
    }

    delete(e) {
        fetch(`http://localhost:3000/users/${this.user_id}/products/${this.asin}`, {
            method: "DELETE",
        }).then(() => {
            user_id.delete(this.user_id);
        });
    }
}