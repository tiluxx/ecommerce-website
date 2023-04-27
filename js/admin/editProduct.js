const editProductForm = document.getElementById('editProductForm');
editProductForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const productId = document.querySelector('#editModalProductId').value
    const productName = document.querySelector('#editModalProductName').value
    const productPrice = document.querySelector('#editModalProductPrice').value
    const productDesc = document.querySelector('#editModalProductDesc').value

    const product = { id: productId, name: productName, price: productPrice, desc: productDesc }
    return editFormHandler(product)
})

async function editFormHandler(product) {
    if (product.id === '') {
        document.getElementById('alertEditForm').innerHTML = "<div class='alert alert-danger'>An error occurred</div>"
        return false
    } 

    if (product.name === '') {
        document.getElementById('alertEditForm').innerHTML = "<div class='alert alert-danger'>Please enter new product's name</div>"
        return false
    } 

    if (product.price === '') {
        document.getElementById('alertEditForm').innerHTML = "<div class='alert alert-danger'>Please enter new product's price</div>"
        return false
    } 

    if (product.desc === '') {
        document.getElementById('alertEditForm').innerHTML = "<div class='alert alert-danger'>Please enter new product's description</div>"
        return false
    }

    await axios.put(
        'http://localhost:5500/api/products/update_product.php',
        product,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Target-Url": "http://localhost:80/test"
            }
        }
    )
        .then(res => {
            const resData = res?.data
            if (resData.code !== 0) {
                console.log(resData?.message)
                return false
            } else {
                window.location.href = '/pages/admin/product-management.html'
                return true
            }
        })
        .catch(error => {
            console.log(error)
            return false
        })    
}