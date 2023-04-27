const deleteProductForm = document.getElementById('deleteProductForm');
deleteProductForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const productId = document.querySelector('#productIdDelete').value

    const product = { id: productId }
    return deleteFormHandler(product)
})

async function deleteFormHandler(product) {
    if (product.id === '') {
        document.getElementById('modalNoticeContent').innerHTML = "<div class='alert alert-danger'>An error occurred</div>"
        return false
    }

    await axios.post(
        `http://localhost:5500/api/products/delete_product.php`,
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