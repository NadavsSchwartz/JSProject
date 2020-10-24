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
        const productsDiv = document.getElementById('products');
        this.pDiv = document.createElement('div')
        this.pDiv.innerHTML = `
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
                <button class="btn trackProduct" >Track</button> 
            </div>

        </div> 
        `
        productsDiv.appendChild(this.pDiv);
        this.pDiv.querySelector('.trackProduct').addEventListener('click', this.track.bind(this));

    }

    track() {

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
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    alert(`Request rejected with status ${res.status}`)
                    throw Error(`Request rejected with status ${res.status}`);
                }
            })
            .then((info) => {
                if (info.errors) {
                    console.log(info.errors);
                } else {
                    this.id = info.id;
                    user.products.push(this);
                    console.log('success');
                }
            });
        this.pDiv.remove();
    }

}