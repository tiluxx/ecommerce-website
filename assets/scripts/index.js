const currProductImgs = document.querySelectorAll('#content__product__current-img');
const currProductThumbnailImgs = document.querySelectorAll('#content__product__thumbnail-img');
const detailCloseBtn = document.getElementById('detail-close');
const productModal = document.getElementById('modal');
const productModalImgs = document.querySelectorAll('#detail-product-image__main-box__current-img');
const productModalThumbnailImgs = document.querySelectorAll('#detail-product__thumbnail-img');

currProductImgs.forEach(currProductImg => currProductImg.addEventListener('click', function() {
    productModal.style.display = 'flex';
}))

detailCloseBtn.addEventListener('click', () => {
    productModal.style.display = 'none';
})

for (let i = 0; i < currProductThumbnailImgs.length; ++i) {
    currProductThumbnailImgs[i].addEventListener('click', () => {
        // Remove "selected" of current thumbnail image
        const mainCurrActive = document.getElementsByClassName('curr-img-selected');
        const currActive = document.getElementsByClassName('img-selected');
        mainCurrActive[0].className = mainCurrActive[0].className.replace('curr-img-selected', '');
        currActive[0].className = currActive[0].className.replace('img-selected', '');

        // Add "selected" of current thumbnail image
        currProductThumbnailImgs[i].classList.add('img-selected');
        currProductImgs[i].classList.add('curr-img-selected');
    })
}

// Modal product's image
for (let i = 0; i < productModalThumbnailImgs.length; ++i) {
    productModalThumbnailImgs[i].addEventListener('click', () => {
        // Remove "selected" of current thumbnail image
        const mainCurrActive = document.getElementsByClassName('detail-curr-img-selected');
        const currActive = document.getElementsByClassName('detail-img-selected');
        mainCurrActive[0].className = mainCurrActive[0].className.replace('detail-curr-img-selected', '');
        currActive[0].className = currActive[0].className.replace('detail-img-selected', '');

        // Add "selected" of current thumbnail image
        productModalThumbnailImgs[i].classList.add('detail-img-selected');
        productModalImgs[i].classList.add('detail-curr-img-selected');
    })
}

// Previous, next modal product's image
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

function handleNextBtn() {
    let index = 0;
    for (let i = 0; i < productModalThumbnailImgs.length; ++i) {
        if (productModalThumbnailImgs[i].classList.contains('detail-img-selected')) {
            index = i;
        }
    }
    productModalThumbnailImgs[index].className = productModalThumbnailImgs[index].className.replace('detail-img-selected', '');
    productModalImgs[index].className = productModalImgs[index].className.replace('detail-curr-img-selected', '');

    if (index == productModalThumbnailImgs.length - 1) {
        productModalThumbnailImgs[0].classList.add('detail-img-selected');
        productModalImgs[0].classList.add('detail-curr-img-selected');
    } else {
        productModalThumbnailImgs[index + 1].classList.add('detail-img-selected');
        productModalImgs[index + 1].classList.add('detail-curr-img-selected');
    }
}

function handlePrevBtn() {
    index = 0;
    for (let i = 0; i < productModalThumbnailImgs.length; ++i) {
        if (productModalThumbnailImgs[i].classList.contains('detail-img-selected')) {
            index = i;
        }
    }
    productModalThumbnailImgs[index].className = productModalThumbnailImgs[index].className.replace('detail-img-selected', '');
    productModalImgs[index].className = productModalImgs[index].className.replace('detail-curr-img-selected', '');

    if (index == 0) {
        productModalThumbnailImgs[productModalThumbnailImgs.length - 1].classList.add('detail-img-selected');
        productModalImgs[productModalImgs.length - 1].classList.add('detail-curr-img-selected');
    } else {
        productModalThumbnailImgs[index - 1].classList.add('detail-img-selected');
        productModalImgs[index - 1].classList.add('detail-curr-img-selected');
    }
}

nextBtn.addEventListener('click', handleNextBtn);
prevBtn.addEventListener('click', handlePrevBtn);

// Minus, plus and input product's quantity
const minusBtn = document.getElementById('minus-btn');
const plusBtn = document.getElementById('plus-btn');
const quantityInput = document.getElementById('quantity-input');

function handleMinusBtn() {
    let currProductQuantity = Number(quantityInput.value);
    if (currProductQuantity > 1) {
        quantityInput.value = `${currProductQuantity - 1}`;
    } else {
        quantityInput.value = '1';
    }
}

function handlePlusBtn() {
    let currProductQuantity = Number(quantityInput.value);
    quantityInput.value = `${currProductQuantity + 1}`;
}

minusBtn.addEventListener('click', handleMinusBtn);
plusBtn.addEventListener('click', handlePlusBtn);

quantityInput.addEventListener('input', () => {
    let currProductQuantity = Number(quantityInput.value);
    if (currProductQuantity < 1) {
        quantityInput.value = '1';
    }
})

// Cart list
const addToCartBtn = document.getElementById('add-to-cart-btn');
const cartList = document.getElementById('cart-list');
const emptyCartMsg = document.querySelector('.header__user-cart-list__no-cart-msg');
const removeCartBtn = document.getElementById('remove-product-btn');
const cartNotice = document.getElementById('cart-notice');

function handleAddToCartBtn() {
    const productTile = document.getElementById('product-title');
    const finalPrice = document.getElementById('final-price');
    const productTitleCart = document.querySelector('.header__user-cart-item-heading');
    const singlePriceCart = document.querySelector('.header__user-cart-item-price');
    const productQuantityCart = document.querySelector('.header__user-cart-item-quantity');
    const productTotalPriceCart = document.querySelector('.header__user-cart-item-final-price');

    let currProductQuantity = Number(quantityInput.value);
    let singleProductPrice = finalPrice.textContent.replace('$', '');
    productTitleCart.textContent = `${productTile.textContent}`;
    singlePriceCart.textContent = `${singleProductPrice}`;
    productQuantityCart.textContent = `${currProductQuantity}`;
    let totalPrice = Number.parseFloat(singlePriceCart.textContent) * Number.parseFloat(currProductQuantity);
    productTotalPriceCart.textContent = `${'$' + totalPrice.toFixed(2)}`;

    emptyCartMsg.style.display = 'none';
    cartList.style.display = 'block';
    cartNotice.textContent = `${currProductQuantity}`;
    cartNotice.style.display = 'block';
}

function handleRemoveCartBtn() {
    emptyCartMsg.style.display = 'block';
    cartList.style.display = 'none';
    cartNotice.style.display = 'none';
}

addToCartBtn.addEventListener('click', handleAddToCartBtn);
removeCartBtn.addEventListener('click', handleRemoveCartBtn);

// Mobile menu
const mobileNavbarModal = document.getElementById('mobile-modal');
const mobileMenuBtn = document.getElementById('menu-icon');
const mobileNavbarCloseBtn = document.getElementById('mobile-navbar-close');

function handleMenuBtn() {
    mobileNavbarModal.style.display = 'flex';
}

function handleNavbarCloseBtn() {
    mobileNavbarModal.style.display = 'none';
}

mobileMenuBtn.addEventListener('click', handleMenuBtn);
mobileNavbarCloseBtn.addEventListener('click', handleNavbarCloseBtn);

// Mobile next, prev btn
const mobileNextBtn = document.getElementById('mobile-next-btn');
const mobilePrevBtn = document.getElementById('mobile-prev-btn');

function handleMobileNextBtn() {
    let index = 0;
    for (let i = 0; i < currProductImgs.length; ++i) {
        if (currProductImgs[i].classList.contains('curr-img-selected')) {
            index = i;
        }
    }

    // Remove "selected" of current product image
    currProductImgs[index].className = currProductImgs[index].className.replace('curr-img-selected', '');

    // Add "selected" of current product image
    if (index == currProductImgs.length - 1) {
        currProductImgs[0].classList.add('curr-img-selected');
    } else {
        currProductImgs[index + 1].classList.add('curr-img-selected');
    }
}

function handleMobilePrevBtn() {
    let index = 0;
    for (let i = 0; i < currProductImgs.length; ++i) {
        if (currProductImgs[i].classList.contains('curr-img-selected')) {
            index = i;
        }
    }
    
    // Remove "selected" of current product image
    currProductImgs[index].className = currProductImgs[index].className.replace('curr-img-selected', '');

    // Add "selected" of current product image
    if (index == 0) {
        currProductImgs[currProductImgs.length - 1].classList.add('curr-img-selected');
    } else {
        currProductImgs[index - 1].classList.add('curr-img-selected');
    }
}


mobileNextBtn.addEventListener('click', handleMobileNextBtn);
mobilePrevBtn.addEventListener('click', handleMobilePrevBtn);