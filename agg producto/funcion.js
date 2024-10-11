const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const products = [];

productForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;
    const imageFile = document.getElementById('productImage').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const product = {
                name,
                price,
                description,
                image: event.target.result
            };
            products.push(product);
            displayProducts();
            productForm.reset();
        };
        reader.readAsDataURL(imageFile);
    } else {
        const product = {
            name,
            price,
            description,
            image: null
        };
        products.push(product);
        displayProducts();
        productForm.reset();
    }
});

function displayProducts() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-4 mb-3 mb-md-0">
                    ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-image img-fluid rounded">` : ''}
                </div>
                <div class="col-md-8">
                    <h5 class="mb-1">${product.name}</h5>
                    <p class="mb-1">Precio: $${product.price}</p>
                    <small>${product.description}</small>
                </div>
            </div>
        `;
        productList.appendChild(li);
    });
}