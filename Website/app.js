document.addEventListener('DOMContentLoaded', () => {
    fetch('Products.json')
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.getElementById('products');
            data.products.forEach(category => {
                const categoryDiv = document.createElement('div');
                categoryDiv.classList.add('product-category');
                const categoryTitle = document.createElement('h3');
                categoryTitle.textContent = category.category;
                categoryDiv.appendChild(categoryTitle);

                // Track displayed products to ensure only 2 unique ones are shown
                const displayedProducts = [];

                // Shuffle the array to avoid displaying the same products on each page load
                const shuffledProducts = shuffleArray(category.items);

                for (let i = 0; i < shuffledProducts.length && displayedProducts.length < 3; i++) {
                    const product = shuffledProducts[i];

                    // Check if the product has already been displayed
                    if (!displayedProducts.includes(product.id)) {
                        displayedProducts.push(product.id);

                        const productDiv = document.createElement('div');
                        productDiv.classList.add('product');

                        const productImg = document.createElement('img');
                        productImg.src = product.image;
                        productImg.alt = product.name;
                        productDiv.appendChild(productImg);

                        const productName = document.createElement('h4');
                        productName.textContent = product.name;
                        productDiv.appendChild(productName);

                        const productDescription = document.createElement('p');
                        productDescription.textContent = product.description;
                        productDiv.appendChild(productDescription);

                        const productButton = document.createElement('button');
                        productButton.textContent = 'Add to Cart';
                        productButton.addEventListener('click', () => {
                            alert(`${product.name} added to cart!`);
                        });
                        productDiv.appendChild(productButton);

                        categoryDiv.appendChild(productDiv);
                    }
                }

                productsContainer.appendChild(categoryDiv);
            });
        });

    // Simple form validation for the custom order form
    const customOrderForm = document.getElementById('custom-order-form');
    customOrderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const artType = document.getElementById('art-type').value;
        const details = document.getElementById('details').value;

        if (name && email && phone && artType && details) {
            alert('Thank you for your custom order request!');
            customOrderForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Simple form validation for the contact form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert('Thank you for your message!');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Auto-size message textarea
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        });
    });
});

// Function to shuffle array elements
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
