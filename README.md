# 🧱 SOLID Principles

**What are SOLID Principles?**  
SOLID is an acronym for five design principles intended to make software designs more understandable, flexible, and maintainable.

## 1. Single Responsibility Principle (SRP)

> A class should have only one reason to change.

### ❌ Bad Example

```javascript
class User {
  saveToDB() {
    // save logic
  }

  sendEmail() {
    // email logic
  }
}
```

### ✅ Good Example

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  saveToDB(user) {
    // save logic
  }
}

class EmailService {
  sendEmail(user) {
    // email logic
  }
}
```

## 2. Open/Closed Principle (OCP)

> Software entities should be open for extension, but closed for modification.

### ❌ Bad Example

```javascript
class AreaCalculator {
  area(shape) {
    if (shape.type === 'circle') {
      return Math.PI * shape.radius * shape.radius;
    }
    else if (shape.type === 'square') {
      return shape.side * shape.side;
    }
  }
}
```

###  ✅ Good Example

```javascript
class Shape {
  area() {
    throw new Error('Area method must be implemented');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  
  area() {
    return this.side * this.side;
  }
}
```

## 3. Liskov Substitution Principle (LSP)

> Subtypes must be substitutable for their base types.

###  ❌ Bad Example

```javascript
class Bird {
  fly() {
    return 'Flying...';
  }
}

class Duck extends Bird {
  fly() {
    return 'Duck flying...';
  }
}

class Ostrich extends Bird {
  fly() {
    throw new Error('Cannot fly'); // Violates LSP
  }
}
```

### ✅ Good Example

```javascript
class Bird {
  move() {
    return 'Moving...';
  }
}

class FlyingBird extends Bird {
  fly() {
    return 'Flying...';
  }
}

class Duck extends FlyingBird {
  fly() {
    return 'Duck flying...';
  }
}

class Ostrich extends Bird {
  run() {
    return 'Running fast...';
  }
}
```

## 4. Interface Segregation Principle (ISP)

> Clients should not be forced to depend on interfaces they do not use.

### ❌ Bad Example

```javascript
class Machine {
  print() {}
  scan() {}
  fax() {}
}

class SimplePrinter extends Machine {
  print() {
    // printing logic
  }
  
  scan() {
    throw new Error('Not supported');
  }
  
  fax() {
    throw new Error('Not supported');
  }
}
```

### ✅ Good Example

```javascript
class Printer {
  print() {}
}

class Scanner {
  scan() {}
}

class FaxMachine {
  fax() {}
}

class SimplePrinter extends Printer {
  print() {
    // printing logic
  }
}

class MultiFunctionPrinter extends Printer {
  constructor() {
    super();
    this.scanner = new Scanner();
    this.faxMachine = new FaxMachine();
  }
  
  print() {
    // printing logic
  }
  
  scan() {
    return this.scanner.scan();
  }
  
  fax() {
    return this.faxMachine.fax();
  }
}
```

## 5. Dependency Inversion Principle (DIP)

> Depend on abstractions, not on concretions.

### ❌ Bad Example

```javascript
class FileLogger {
  log(msg) {
    console.log(`Writing to file: ${msg}`);
  }
}

class App {
  constructor() {
    this.logger = new FileLogger(); // Direct dependency
  }
  
  doSomething() {
    this.logger.log('Doing something...');
  }
}
```

### ✅ Good Example

```javascript
class Logger {
  log(msg) {
    throw new Error('Log method must be implemented');
  }
}

class FileLogger extends Logger {
  log(msg) {
    console.log(`Writing to file: ${msg}`);
  }
}

class DatabaseLogger extends Logger {
  log(msg) {
    console.log(`Writing to database: ${msg}`);
  }
}

class App {
  constructor(logger) {
    this.logger = logger; // Dependency injection
  }
  
  doSomething() {
    this.logger.log('Doing something...');
  }
}

// Usage
const app1 = new App(new FileLogger());
const app2 = new App(new DatabaseLogger());
```

## Benefits of Following SOLID Principles

- **Maintainability**: Code is easier to maintain and modify
- **Flexibility**: Easy to extend and add new features
- **Testability**: Components can be tested in isolation
- **Reusability**: Code components can be reused across different parts of the application
- **Reduced Coupling**: Components are loosely coupled, making the system more robust

## Conclusion

SOLID principles are fundamental guidelines that help create robust, maintainable, and scalable software. While they originated in object-oriented programming, many of these concepts can be applied to functional programming and other paradigms as well.