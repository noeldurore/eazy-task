/*
Filename: ComplexApplication.js

This code is a complex web application that simulates a virtual shopping platform. It includes features such as user authentication, product display, shopping cart functionality, order processing, and more.
*/

// **********************************************************************
// Global Variables and Constants
// **********************************************************************

let loggedInUser = null;
const products = [
  { id: 1, name: 'Shirt', price: 20 },
  { id: 2, name: 'Pants', price: 30 },
  { id: 3, name: 'Shoes', price: 50 },
  // ... many more products
];

// **********************************************************************
// User Authentication
// **********************************************************************

function login(username, password) {
  // Perform authentication logic here
  loggedInUser = { username: username, role: 'customer' }; // Simulate successful login
}

function logout() {
  loggedInUser = null;
}

function authenticateUser() {
  // Check if user is authenticated or redirect to login page
  if (!loggedInUser) {
    // Redirect to login page
    window.location.href = './login.html';
  }
}

// **********************************************************************
// Product Display
// **********************************************************************

function displayProducts() {
  authenticateUser();
  
  console.log('--- Available Products ---');
  products.forEach((product) => {
    console.log(`${product.name}: $${product.price}`);
  });
}

// **********************************************************************
// Shopping Cart Functionality
// **********************************************************************

class Cart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    const existingItem = this.items.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product: product, quantity: quantity });
    }
  }

  removeItem(product) {
    const index = this.items.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  calculateTotal() {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  checkout() {
    // Implement checkout and payment logic here
    console.log('--- Order Placed ---');
    console.log('Items in Cart:');
    this.items.forEach((item) => {
      console.log(`${item.product.name} - Quantity: ${item.quantity}`);
    });
    console.log('Total: $' + this.calculateTotal());
    console.log('Payment Successful!');
    this.items = []; // Empty the cart after successful checkout
  }
}

// **********************************************************************
// Order Processing
// **********************************************************************

function processOrder() {
  authenticateUser();

  const cart = new Cart();
  cart.addItem(products[0], 1);
  cart.addItem(products[1], 2);

  console.log('--- Order Summary ---');
  console.log('Items in Cart:');
  cart.items.forEach((item) => {
    console.log(`${item.product.name} - Quantity: ${item.quantity}`);
  });
  console.log('Total: $' + cart.calculateTotal());
  console.log('Processing order...');

  setTimeout(function () {
    cart.checkout();
  }, 2000); // Simulate delay for order processing
}

// **********************************************************************
// Main Execution
// **********************************************************************

console.log('--- Welcome to our Virtual Shopping Platform ---');

// Simulate user interaction and application flow
login('john_doe', 'password123');
displayProducts();
processOrder();
logout();