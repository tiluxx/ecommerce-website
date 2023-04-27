const addProductForm = document.getElementById("addProductForm");
addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const productName = document.querySelector("#product-name").value;
    const productPrice = document.querySelector("#product-price").value;
    const productDesc = document.querySelector("#product-desc").value;

    const product = {
        name: productName,
        price: productPrice,
        desc: productDesc,
    };
    return addProductHandler(product);
});

async function addProductHandler(product) {
    const { name, desc, price } = product;
    let timeoutId;
    let error = "";
    if (!name) {
        error = "Please provide a product name";
    } else if (!price) {
        error = "Please provide a product price";
    } else if (Number(price) <= 0) {
        error = "Product price is invalid";
    } else if (!desc) {
        error = "Please provide a product description";
    }

    if (error) {
        document.getElementById("errorMessage").style.display = "block";
        timeoutId = setTimeout(() => {
            document.getElementById("errorMessage").style.display = "none";
        }, 3000);
        document.getElementById("errorMessage").innerHTML = error;
        return false;
    }

    await axios
        .post("http://localhost:5500/api/products/add_product.php", product, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Target-Url": "http://localhost:80",
            },
        })
        .then((res) => {
            const resData = res?.data;
            let timeoutId;
            if (resData.code !== 0) {
                document.getElementById("errorMessage").style.display = "block";
                timeoutId = setTimeout(() => {
                    document.getElementById("errorMessage").style.display =
                        "none";
                }, 3000);
                document.getElementById("errorMessage").innerHTML =
                    resData.message;
                return false;
            } else {
                clearTimeout(timeoutId);
                window.location.href = "/pages/admin/product-management.html";
                return true;
            }
        })
        .catch((error) => {
            document.getElementById("errorMessage").style.display = "block";
            setTimeout(() => {
                document.getElementById("errorMessage").style.display = "none";
            }, 3000);
            document.getElementById("errorMessage").innerHTML = error;
            return false;
        });
}
