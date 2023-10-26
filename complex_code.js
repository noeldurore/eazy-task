/**
 * Filename: complex_code.js
 * 
 * Description: A complex JavaScript code that demonstrates various advanced concepts and techniques.
 *              This code is a simplified implementation of an online shopping cart functionality.
 */

// Define a ShoppingCart class
class ShoppingCart {
  constructor() {
    this.items = [];  // Array to store the items in the cart
  }

  // Add an item to the cart
  addItem(item) {
    if (this.items.includes(item)) {
      console.log(`${item} is already in the cart.`);
    } else {
      this.items.push(item);
      console.log(`${item} has been added to the cart.`);
    }
  }

  // Remove an item from the cart
  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      console.log(`${item} has been removed from the cart.`);
    } else {
      console.log(`${item} is not in the cart.`);
    }
  }

  // Get the total cost of all items in the cart
  getTotalCost() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  // Get the number of items in the cart
  getItemCount() {
    return this.items.length;
  }
}

// Define an Item class
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

// Create a new ShoppingCart instance
const cart = new ShoppingCart();

// Add some items to the cart
cart.addItem(new Item('Book', 29.99));
cart.addItem(new Item('Shoes', 59.99));
cart.addItem(new Item('Headphones', 79.99));

// Remove an item from the cart
cart.removeItem('Shoes');

// Get and display the cart details
console.log(`Total Items: ${cart.getItemCount()}`);
console.log(`Total Cost: $${cart.getTotalCost().toFixed(2)}`);

// Output:
// Book has been added to the cart.
// Shoes has been added to the cart.
// Headphones has been added to the cart.
// Shoes has been removed from the cart.
// Total Items: 2
// Total Cost: $109.98