document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const addProductForm = document.getElementById('add-product-form');

    // Sample product data
    let products = JSON.parse(localStorage.getItem('products')) || [
        { id: 1, name: 'Product 1', price: 10.00, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', price: 20.00, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', price: 30.00, image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Product 4', price: 40.00, image: 'https://via.placeholder.com/150' },
    ];

    // Display products
    const displayProducts = () => {
        productList.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(productElement);
        });
    };

    // Add product function
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = parseFloat(document.getElementById('product-price').value);
        const imageInput = document.getElementById('product-image');
        const imageFile = imageInput.files[0];

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                const newProduct = {
                    id: products.length + 1,
                    name,
                    price,
                    image: imageUrl
                };
                products.push(newProduct);
                localStorage.setItem('products', JSON.stringify(products));
                displayProducts();
                addProductForm.reset();
            };
            reader.readAsDataURL(imageFile);
        }
    });

    // Add to cart function
    window.addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} has been added to your cart!`);
    };

    // Initial display
    displayProducts();
});
