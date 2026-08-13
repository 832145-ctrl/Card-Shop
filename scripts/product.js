document.addEventListener('DOMContentLoaded', () => {
    const productDetail = document.getElementById('product-detail');

    // Sample product data
    const products = JSON.parse(localStorage.getItem('products')) || [
        { id: 1, name: 'Product 1', price: 10.00, image: 'https://via.placeholder.com/150', description: 'Description for Product 1' },
        { id: 2, name: 'Product 2', price: 20.00, image: 'https://via.placeholder.com/150', description: 'Description for Product 2' },
        { id: 3, name: 'Product 3', price: 30.00, image: 'https://via.placeholder.com/150', description: 'Description for Product 3' },
        { id: 4, name: 'Product 4', price: 40.00, image: 'https://via.placeholder.com/150', description: 'Description for Product 4' },
    ];

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Find product by ID
    const product = products.find(p => p.id === productId);

    // Display product detail
    if (product) {
        productDetail.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div>
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    } else {
        productDetail.innerHTML = '<p>Product not found.</p>';
    }

    // Add to cart function
    window.addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} has been added to your cart!`);
    };
});
