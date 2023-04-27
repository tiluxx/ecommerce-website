window.onload = getProductList()

async function getProductList() {
    const productList = document.getElementById('productList')

    await axios.get(
        'http://localhost:3000/api/products/get_products.php',
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Target-Url": "http://ltn-webservices.great-site.net"
            }
        }
    )
        .then(res => {
            const resData = res?.data
            let timeoutId
            if (resData.code !== 0) {
                document.getElementById('errorMessage').style.display = 'block'
                timeoutId = setTimeout(() => {
                    document.getElementById('errorMessage').style.display = 'none'
                }, 3000)
                document.getElementById('errorMessage').innerHTML = resData.message
                return false
            } else {
                clearTimeout(timeoutId)
                const products = resData.data
                console.log(products)
                
                products.forEach(product => {
                    $('#productList').append(
                        '<div class="col-sm-1 col-md-4 col-lg-3 col-xl-2">' +
                        '<div class="card shadow-sm">' +
                            '<svg' +
                                'class="bd-placeholder-img card-img-top"' +
                                'width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">' +
                                '<title>Placeholder</title>' +
                                '<rect width="100%"  height="100%" fill="#55595c" />' +
                                '<text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>' +
                            '</svg>' +
                            '<div class="card-body">' +
                                '<a href="#" type="button" class="card-title card-link text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">' +
                                    '<h5>' + product.name + '</h5>' +
                                '</a>' +
                                '<p class="card-text">' +
                                    product.desc +
                                '</p>' +
                                '<div class="d-flex justify-content-between align-items-center">' +
                                    '<h5 class="card-text">' + product.price + '</h5>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                    )
                })
                window.location.href = '/pages/admin/product-management.html'
                return true
            }
        })
        .catch(error => {
            document.getElementById('errorMessage').style.display = 'block'
            setTimeout(() => {
                document.getElementById('errorMessage').style.display = 'none'
            }, 3000)
            document.getElementById('errorMessage').innerHTML = error
            return false
        })   
}