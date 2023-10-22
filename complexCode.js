/* 
  Filename: complexCode.js

  Description: This code is a complex implementation of a data structure called a Trie. A Trie is an efficient tree-like data structure that is used for storing and retrieving strings. This implementation supports insertion, deletion, and searching of strings, as well as providing advanced functionality like auto-complete suggestions and prefix matching.

  Note: This implementation is a simplified version and doesn't include error handling or optimizations for brevity.

  Author: Your Name
*/

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode());
      }
      currentNode = currentNode.children.get(char);
    }

    currentNode.isEndOfWord = true;
  }

  search(word) {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char);
    }

    return currentNode.isEndOfWord;
  }

  delete(word) {
    this.deleteRecursive(this.root, word, 0);
  }

  deleteRecursive(currentNode, word, index) {
    if (index === word.length) {
      currentNode.isEndOfWord = false;
      return;
    }

    const char = word[index];
    if (!currentNode.children.has(char)) {
      return;
    }

    const nextNode = currentNode.children.get(char);
    this.deleteRecursive(nextNode, word, index + 1);

    if (nextNode.children.size === 0 && !nextNode.isEndOfWord) {
      currentNode.children.delete(char);
    }
  }

  autoComplete(prefix) {
    let currentNode = this.root;
    const suggestions = [];

    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!currentNode.children.has(char)) {
        return suggestions;
      }
      currentNode = currentNode.children.get(char);
    }

    this.collectWords(currentNode, prefix, suggestions);
    return suggestions;
  }

  collectWords(node, prefix, suggestions) {
    if (node.isEndOfWord) {
      suggestions.push(prefix);
    }

    for (const [char, child] of node.children) {
      this.collectWords(child, prefix + char, suggestions);
    }
  }
}

// Example usage:
const trie = new Trie();
trie.insert("apple");
trie.insert("banana");
trie.insert("application");
trie.insert("applet");
trie.insert("bean");
console.log(trie.search("apple")); // Output: true
console.log(trie.search("pear")); // Output: false
console.log(trie.autoComplete("app")); // Output: ['apple', 'application', 'applet']
trie.delete("applet");
console.log(trie.search("applet")); // Output: false
console.log(trie.autoComplete("app")); // Output: ['apple', 'application']
console.log(trie.autoComplete("ban")); // Output: ['banana']
console.log(trie.autoComplete("pea")); // Output: []