const products = [
    { id: 1, name: "Laptop", category: "electronics", price: 800, rating: 5, image: "assets/laptop.jpg" },
    { id: 2, name: "Smartphone", category: "electronics", price: 500, rating: 4, image: "assets/smartphone.jpg" },
    { id: 3, name: "Shirt", category: "clothing", price: 30, rating: 3, image: "assets/shirt.jpg" },
    { id: 4, name: "Jacket", category: "clothing", price: 100, rating: 4, image: "assets/jacket.jpg" },
    { id: 5, name: "Watch", category: "accessories", price: 150, rating: 5, image: "assets/watch.jpg" },
    { id: 6, name: "Headphones", category: "electronics", price: 100, rating: 3, image: "assets/headphones.jpg" },
    { id: 7, name: "Sunglasses", category: "accessories", price: 50, rating: 4, image: "assets/sunglasses.jpg" }
];

let cart = [];

function displayProducts(filteredProducts) {
    const productContainer = document.querySelector('.product-list');
    productContainer.innerHTML = ''; // Clear previous products

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <p class="rating">Rating: ${'★'.repeat(product.rating)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    cart.push(product);
    document.getElementById('cartButton').textContent = `Cart (${cart.length})`;
}

function filterProducts() {
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const rating = document.getElementById('rating').value;

    let filtered = products;

    if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }

    filtered = filtered.filter(product => product.price <= price);

    if (rating !== 'all') {
        filtered = filtered.filter(product => product.rating >= rating);
    }

    displayProducts(filtered);
}

// Event listeners
document.getElementById('filterForm').addEventListener('change', filterProducts);
document.getElementById('price').addEventListener('input', (e) => {
    document.getElementById('price-value').textContent = e.target.value;
    filterProducts();
});

// Cart Modal Logic
document.getElementById('cartButton').addEventListener('click', () => {
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = item.name;
        cartItemsContainer.appendChild(cartItem);
    });

    cartModal.style.display = 'flex';
});

document.getElementById('closeCartButton').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'none';
});

// Initial display of all products
displayProducts(products);
