class Product {
    constructor({
        ASIN,
        title,
        price,
        imageUrl,
        detailPageURL,
        rating,
        totalReviews
    }) {
        this.asin = ASIN;
        this.title = title;
        this.price = price;
        this.img = imageUrl;
        this.detailPageURL = detailPageURL;
        this.rating = rating;
        this.totalReviews = totalReviews;
        this.display()
        this.save()
    }

    save() {
        fetch("http://localhost:3000/products", {
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
                        user_id: 1
                    },
                }),
            })
            .then((r) => r.json())
            .then((info) => {
                if (info.errors) {
                    console.log(info.errors);
                } else {
                    console.log('success')
                }
            });
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
                <a class="btn" href="">Track</a> 
            </div>

        </div> 
        `

        // const h2 = document.createElement("h2");
        // product.innerText = this.title;
        // product.appendChild(h2);

        // const img = document.createElement('img');
        // img.src = this.img;
        // product.appendChild(img)

        // const para = document.createElement("p");
        // para.innerText = this.price;
        // product.appendChild(para);

        // const details = document.createElement("button");
        // details.innerHTML = "Details";
        // details.addEventListener("click", (e) => location.href = this.detailPageURL);
        // product.appendChild(details)

        // const price = document.createElement("p");
        // price.innerText = `price: ${this.rating}`;
        // product.appendChild(price);

        // const button = document.createElement("button");
        // button.innerText = "Delete";
        // button.addEventListener("click", (e) => this.delete(e));
        // product.appendChild(button);
    }

    delete(e) {
        fetch(`http://localhost:3000/products/${this.id}`, {
            method: "DELETE",
        }).then(() => {
            id.delete(this.id);
        });
    }
}