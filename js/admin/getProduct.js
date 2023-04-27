window.onload = getProductList();

function viewDetailHandler(index) {
    const productId = document.getElementById("productId" + index);
    const productName = document.getElementById("productName" + index);
    const productDescription = document.getElementById(
        "productDescription" + index
    );
    const productPrice = document.getElementById("productPrice" + index);
    document.getElementById("modalProductId").value = productId.value;
    document.getElementById("modalProductName").innerHTML =
        productName.innerHTML;
    document.getElementById("modalProductPrice").innerHTML =
        productPrice.innerHTML;
    document.getElementById("modalProductDescription").innerHTML =
        productDescription.innerHTML;
}

async function getProductList() {
    const productList = document.getElementById("productList");

    await axios
        .get("http://localhost:5500/api/products/get_products.php", {
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
            } else {
                clearTimeout(timeoutId);
                const products = resData.data;

                products.forEach((product, index) => {
                    productList.innerHTML +=
                        '<div class="col-sm-1 col-md-4 col-lg-3 col-xl-2">' +
                        '<div class="card shadow-sm">' +
                        "<svg " +
                        'class="bd-placeholder-img card-img-top"' +
                        'width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">' +
                        "<title>Placeholder</title>" +
                        '<rect width="100%"  height="100%" fill="#55595c" />' +
                        '<text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>' +
                        "</svg>" +
                        '<div class="card-body">' +
                        `<input id="productId` +
                        index +
                        `" type="hidden" value="${product.productId}">` +
                        '<a href="#" type="button" onclick="viewDetailHandler(' +
                        index +
                        ')" class="card-title card-link text-primary" data-bs-toggle="modal" data-bs-target="#productDetailModal">' +
                        '<h5 id="productName' +
                        index +
                        '">' +
                        product.productName +
                        "</h5>" +
                        "</a>" +
                        '<p id="productDescription' +
                        index +
                        '" class="card-text">' +
                        product.productDescription +
                        "</p>" +
                        '<div class="d-flex justify-content-between align-items-center">' +
                        '<h5 id="productPrice' +
                        index +
                        '" class="card-text">' +
                        product.productPrice +
                        "</h5>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
