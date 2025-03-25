const testData = {
    name: "Test Chips",
    production_date: "2024-09-20",
    expiry_date: "2024-10-20",
    price: 2.5,
    image_url: "https://example.com/test-chips.jpg"
};

// Example of sending this data using fetch
fetch('https://api.example.com/products', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));