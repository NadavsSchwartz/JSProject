class User {
    constructor(email, name, id = null) {
        this.email = email;
        this.name = name;
        this.id = id
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