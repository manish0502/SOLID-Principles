# Open-Closed Principle (OCP) - SOLID Principles in JavaScript

## 📋 Table of Contents
- [Open-Closed Principle (OCP) - SOLID Principles in JavaScript](#open-closed-principle-ocp---solid-principles-in-javascript)
  - [📋 Table of Contents](#-table-of-contents)
  - [What is the Open-Closed Principle?](#what-is-the-open-closed-principle)
  - [Why is OCP Important?](#why-is-ocp-important)
  - [Bad Example (Violating OCP)](#bad-example-violating-ocp)
  - [Good Example (Following OCP)](#good-example-following-ocp)
  - [Real-World Example: Payment Processing System](#real-world-example-payment-processing-system)
  - [Visual Diagram](#visual-diagram)
  - [Benefits of Following OCP](#benefits-of-following-ocp)
  - [Common Patterns for OCP](#common-patterns-for-ocp)
    - [1. Strategy Pattern](#1-strategy-pattern)
    - [2. Observer Pattern](#2-observer-pattern)
    - [3. Plugin Architecture](#3-plugin-architecture)
  - [Testing OCP Implementation](#testing-ocp-implementation)
  - [Conclusion](#conclusion)
    - [Key Takeaways:](#key-takeaways)
    - [Remember:](#remember)
  - [📚 Related SOLID Principles](#-related-solid-principles)

## What is the Open-Closed Principle?

> **"Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification."**
> 
> *- Bertrand Meyer*

The Open-Closed Principle is the second principle of SOLID design principles. It means:

- **Open for Extension**: You should be able to add new functionality
- **Closed for Modification**: You shouldn't need to modify existing, working code

## Why is OCP Important?

- **Reduces Risk**: No need to modify tested, working code
- **Improves Maintainability**: New features don't break existing functionality
- **Enhances Scalability**: Easy to add new behaviors without touching core logic
- **Follows DRY Principle**: Avoid duplicating code modifications

## Bad Example (Violating OCP)

Here's an example that violates the Open-Closed Principle:

```javascript
// ❌ BAD: Violates Open-Closed Principle
class AreaCalculator {
  calculateArea(shapes) {
    let totalArea = 0;
    
    for (let shape of shapes) {
      if (shape.type === 'rectangle') {
        totalArea += shape.width * shape.height;
      } else if (shape.type === 'circle') {
        totalArea += Math.PI * shape.radius * shape.radius;
      } else if (shape.type === 'triangle') {
        // Every time we add a new shape, we need to modify this class!
        totalArea += 0.5 * shape.base * shape.height;
      }
      // What if we want to add more shapes? We keep modifying this class!
    }
    
    return totalArea;
  }
}

// Usage
const calculator = new AreaCalculator();
const shapes = [
  { type: 'rectangle', width: 10, height: 5 },
  { type: 'circle', radius: 7 },
  { type: 'triangle', base: 6, height: 8 }
];

console.log(calculator.calculateArea(shapes)); // 228.38...
```

**Problems with this approach:**
- Every new shape requires modifying the `AreaCalculator` class
- Risk of breaking existing functionality
- Violates Single Responsibility Principle as well
- Hard to test individual shape calculations

## Good Example (Following OCP)

Here's the same example following the Open-Closed Principle:

```javascript
// ✅ GOOD: Follows Open-Closed Principle

// Base Shape interface/contract
class Shape {
  calculateArea() {
    throw new Error('calculateArea method must be implemented');
  }
}

// Concrete shape implementations
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  calculateArea() {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
}

class Triangle extends Shape {
  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }
  
  calculateArea() {
    return 0.5 * this.base * this.height;
  }
}

// Calculator that is closed for modification but open for extension
class AreaCalculator {
  calculateArea(shapes) {
    return shapes.reduce((total, shape) => {
      return total + shape.calculateArea();
    }, 0);
  }
}

// Easy to extend with new shapes without modifying existing code!
class Hexagon extends Shape {
  constructor(side, apothem) {
    super();
    this.side = side;
    this.apothem = apothem;
  }
  
  calculateArea() {
    return 3 * this.side * this.apothem;
  }
}

// Usage
const calculator = new AreaCalculator();
const shapes = [
  new Rectangle(10, 5),
  new Circle(7),
  new Triangle(6, 8),
  new Hexagon(4, 3.46) // New shape added without modifying AreaCalculator!
];

console.log(calculator.calculateArea(shapes)); // 270.02...
```

## Real-World Example: Payment Processing System

Let's look at a real-world example of a payment processing system:

```javascript
// ✅ Payment Processing System Following OCP

// Base PaymentProcessor
class PaymentProcessor {
  processPayment(amount) {
    throw new Error('processPayment method must be implemented');
  }
  
  validatePayment(amount) {
    if (amount <= 0) {
      throw new Error('Payment amount must be positive');
    }
    return true;
  }
}

// Concrete payment implementations
class CreditCardProcessor extends PaymentProcessor {
  constructor(cardNumber, cvv, expiryDate) {
    super();
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expiryDate = expiryDate;
  }
  
  processPayment(amount) {
    this.validatePayment(amount);
    console.log(`Processing $${amount} via Credit Card ending in ${this.cardNumber.slice(-4)}`);
    // Simulate credit card processing logic
    return {
      success: true,
      transactionId: `CC_${Date.now()}`,
      method: 'Credit Card'
    };
  }
}

class PayPalProcessor extends PaymentProcessor {
  constructor(email) {
    super();
    this.email = email;
  }
  
  processPayment(amount) {
    this.validatePayment(amount);
    console.log(`Processing $${amount} via PayPal for ${this.email}`);
    // Simulate PayPal processing logic
    return {
      success: true,
      transactionId: `PP_${Date.now()}`,
      method: 'PayPal'
    };
  }
}

class BankTransferProcessor extends PaymentProcessor {
  constructor(accountNumber, routingNumber) {
    super();
    this.accountNumber = accountNumber;
    this.routingNumber = routingNumber;
  }
  
  processPayment(amount) {
    this.validatePayment(amount);
    console.log(`Processing $${amount} via Bank Transfer`);
    // Simulate bank transfer processing logic
    return {
      success: true,
      transactionId: `BT_${Date.now()}`,
      method: 'Bank Transfer'
    };
  }
}

// Payment service that doesn't need modification when new payment methods are added
class PaymentService {
  constructor() {
    this.processors = [];
  }
  
  addPaymentMethod(processor) {
    if (!(processor instanceof PaymentProcessor)) {
      throw new Error('Processor must extend PaymentProcessor');
    }
    this.processors.push(processor);
  }
  
  processPayments(amount) {
    const results = [];
    
    for (let processor of this.processors) {
      try {
        const result = processor.processPayment(amount);
        results.push(result);
      } catch (error) {
        results.push({
          success: false,
          error: error.message,
          method: processor.constructor.name
        });
      }
    }
    
    return results;
  }
}

// Easy to add new payment methods without modifying existing code!
class CryptocurrencyProcessor extends PaymentProcessor {
  constructor(walletAddress, cryptoType) {
    super();
    this.walletAddress = walletAddress;
    this.cryptoType = cryptoType;
  }
  
  processPayment(amount) {
    this.validatePayment(amount);
    console.log(`Processing $${amount} via ${this.cryptoType} to ${this.walletAddress}`);
    return {
      success: true,
      transactionId: `CRYPTO_${Date.now()}`,
      method: `${this.cryptoType} Cryptocurrency`
    };
  }
}

// Usage Example
const paymentService = new PaymentService();

// Add various payment methods
paymentService.addPaymentMethod(new CreditCardProcessor('1234567890123456', '123', '12/25'));
paymentService.addPaymentMethod(new PayPalProcessor('user@example.com'));
paymentService.addPaymentMethod(new BankTransferProcessor('987654321', '123456789'));
paymentService.addPaymentMethod(new CryptocurrencyProcessor('1A2B3C4D5E6F', 'Bitcoin'));

// Process payments
const results = paymentService.processPayments(100);
console.log('Payment Results:', results);
```

## Visual Diagram

```
🔒 CLOSED FOR MODIFICATION (Stable Core)
┌─────────────────────────────────────────┐
│           PaymentService                │
│  ┌─────────────────────────────────┐    │
│  │     processPayments()           │    │
│  │     addPaymentMethod()          │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
                    │
                    │ uses
                    ▼
┌─────────────────────────────────────────┐
│        PaymentProcessor                 │
│        (Abstract Base)                  │
│  ┌─────────────────────────────────┐    │
│  │    + processPayment()           │    │
│  │    + validatePayment()          │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
                    △
                    │ extends
      ┌─────────────┼─────────────┐
      │             │             │
      ▼             ▼             ▼
┌───────────┐ ┌───────────┐ ┌───────────┐
│ Credit    │ │  PayPal   │ │   Bank    │
│ Card      │ │Processor  │ │ Transfer  │
│Processor  │ │           │ │Processor  │
└───────────┘ └───────────┘ └───────────┘

🔓 OPEN FOR EXTENSION (Easy to Add New Types)
                    │
                    ▼
              ┌───────────┐
              │  Crypto   │
              │Processor  │
              │  (New!)   │
              └───────────┘
```

## Benefits of Following OCP

1. **Reduced Risk**: Existing code remains untouched and stable
2. **Easy Testing**: New functionality can be tested in isolation
3. **Better Organization**: Clear separation of concerns
4. **Scalability**: System grows without becoming fragile
5. **Team Collaboration**: Different developers can work on extensions independently

## Common Patterns for OCP

### 1. Strategy Pattern
```javascript
class DataProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  process(data) {
    return this.strategy.execute(data);
  }
}

class JSONProcessor {
  execute(data) {
    return JSON.stringify(data);
  }
}

class XMLProcessor {
  execute(data) {
    return `<root>${JSON.stringify(data)}</root>`;
  }
}
```

### 2. Observer Pattern
```javascript
class EventEmitter {
  constructor() {
    this.listeners = [];
  }
  
  addListener(listener) {
    this.listeners.push(listener);
  }
  
  emit(event) {
    this.listeners.forEach(listener => listener(event));
  }
}
```

### 3. Plugin Architecture
```javascript
class PluginManager {
  constructor() {
    this.plugins = [];
  }
  
  register(plugin) {
    this.plugins.push(plugin);
  }
  
  execute(context) {
    return this.plugins.reduce((result, plugin) => {
      return plugin.process(result);
    }, context);
  }
}
```

## Testing OCP Implementation

```javascript
// Example test for our shape calculator
describe('AreaCalculator', () => {
  let calculator;
  
  beforeEach(() => {
    calculator = new AreaCalculator();
  });
  
  test('should calculate area for different shapes', () => {
    const shapes = [
      new Rectangle(5, 4),
      new Circle(3)
    ];
    
    const expectedArea = 20 + (Math.PI * 9); // Rectangle + Circle
    expect(calculator.calculateArea(shapes)).toBeCloseTo(expectedArea);
  });
  
  test('should work with new shapes without modification', () => {
    // This test proves our OCP implementation works
    class Square extends Shape {
      constructor(side) {
        super();
        this.side = side;
      }
      
      calculateArea() {
        return this.side * this.side;
      }
    }
    
    const shapes = [new Square(5)];
    expect(calculator.calculateArea(shapes)).toBe(25);
  });
});
```

## Conclusion

The Open-Closed Principle is fundamental to writing maintainable, scalable code. By designing your classes and modules to be closed for modification but open for extension, you create systems that can grow and evolve without breaking existing functionality.

### Key Takeaways:
- Use inheritance and polymorphism to enable extension
- Design interfaces/base classes that define contracts
- Avoid modifying existing, tested code when adding features
- Think about future requirements during initial design
- Apply common patterns like Strategy, Observer, and Plugin architectures

### Remember:
> "The best code is code that doesn't need to be changed when requirements change, but can be extended to meet new requirements."

---

## 📚 Related SOLID Principles

- [Single Responsibility Principle (SRP)](link-to-srp-readme)
- [Liskov Substitution Principle (LSP)](link-to-lsp-readme) 
- [Interface Segregation Principle (ISP)](link-to-isp-readme)
- [Dependency Inversion Principle (DIP)](link-to-dip-readme)

---

**Happy Coding! 🚀**

*This README demonstrates the Open-Closed Principle with practical JavaScript examples. Feel free to contribute improvements or additional examples!*