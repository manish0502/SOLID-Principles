# DIP (Dependency Inversion Principle)

## Overview

The Dependency Inversion Principle (DIP) is the fifth and final principle of the SOLID design principles. It states that high-level modules should not depend on low-level modules, but both should depend on abstractions. Additionally, abstractions should not depend on details, but details should depend on abstractions.

## Table of Contents

- [What is Dependency Inversion Principle?](#what-is-dependency-inversion-principle)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Benefits](#benefits)
- [Implementation](#implementation)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Common Violations](#common-violations)
- [Related Patterns](#related-patterns)
- [Resources](#resources)

## What is Dependency Inversion Principle?

The Dependency Inversion Principle (DIP) consists of two key statements:

1. **High-level modules should not depend on low-level modules. Both should depend on abstractions.**
2. **Abstractions should not depend on details. Details should depend on abstractions.**

This principle helps in creating flexible, maintainable, and testable code by inverting the traditional dependency relationship between high-level and low-level modules.

## Problem Statement

### Traditional Dependency Flow
In traditional software design, high-level modules directly depend on low-level modules, creating tight coupling:

```
High-level Module → Low-level Module
```

This creates several problems:
- **Tight Coupling**: Changes in low-level modules affect high-level modules
- **Difficult Testing**: Hard to mock or substitute dependencies
- **Reduced Flexibility**: Difficult to switch implementations
- **Violation of Open/Closed Principle**: Modifications require changes in multiple places

### Example of Violation

```typescript
// BAD: High-level module depends on low-level module
class EmailService {
  sendEmail(message: string): void {
    console.log(`Sending email: ${message}`);
  }
}

class NotificationService {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService(); // Direct dependency
  }

  sendNotification(message: string): void {
    this.emailService.sendEmail(message);
  }
}
```

## Solution

### Inverted Dependency Flow
The DIP inverts the dependency relationship by introducing abstractions:

```
High-level Module → Abstraction ← Low-level Module
```

Both high-level and low-level modules depend on abstractions, not on each other.

### Example of Correct Implementation

```typescript
// GOOD: Both depend on abstraction

// Abstraction
interface MessageSender {
  send(message: string): void;
}

// Low-level modules depend on abstraction
class EmailService implements MessageSender {
  send(message: string): void {
    console.log(`Sending email: ${message}`);
  }
}

class SMSService implements MessageSender {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
  }
}

// High-level module depends on abstraction
class NotificationService {
  constructor(private messageSender: MessageSender) {}

  sendNotification(message: string): void {
    this.messageSender.send(message);
  }
}
```

## Benefits

### 1. Loose Coupling
- High-level modules are independent of low-level implementation details
- Changes in low-level modules don't affect high-level modules

### 2. Flexibility
- Easy to switch between different implementations
- Support for multiple implementations simultaneously

### 3. Testability
- Easy to mock dependencies for unit testing
- Improved test isolation

### 4. Maintainability
- Easier to modify and extend the system
- Better separation of concerns

### 5. Reusability
- High-level modules can be reused with different low-level implementations

## Implementation

### Step 1: Define Abstractions
Create interfaces that define the contract:

```typescript
interface DataRepository {
  save(data: any): Promise<void>;
  get(id: string): Promise<any>;
  delete(id: string): Promise<void>;
}
```

### Step 2: Implement Low-level Modules
Create concrete implementations that depend on abstractions:

```typescript
class DatabaseRepository implements DataRepository {
  async save(data: any): Promise<void> {
    console.log(`Saving to database: ${JSON.stringify(data)}`);
    // Database save logic
  }

  async get(id: string): Promise<any> {
    console.log(`Getting from database: ${id}`);
    return { id, data: 'database data' };
  }

  async delete(id: string): Promise<void> {
    console.log(`Deleting from database: ${id}`);
  }
}

class FileRepository implements DataRepository {
  async save(data: any): Promise<void> {
    console.log(`Saving to file: ${JSON.stringify(data)}`);
    // File save logic
  }

  async get(id: string): Promise<any> {
    console.log(`Getting from file: ${id}`);
    return { id, data: 'file data' };
  }

  async delete(id: string): Promise<void> {
    console.log(`Deleting from file: ${id}`);
  }
}
```

### Step 3: Implement High-level Modules
Create high-level modules that depend on abstractions:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

class UserService {
  constructor(private repository: DataRepository) {}

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const user: User = {
      id: this.generateId(),
      ...userData
    };

    const processedUser = this.processUserData(user);
    await this.repository.save(processedUser);
    return processedUser;
  }

  async getUser(userId: string): Promise<User> {
    return await this.repository.get(userId);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.repository.delete(userId);
  }

  private processUserData(user: User): User {
    // High-level business logic
    return {
      ...user,
      email: user.email.toLowerCase()
    };
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
```

### Step 4: Dependency Injection
Inject dependencies at runtime:

```typescript
// Using different implementations
const databaseRepo = new DatabaseRepository();
const fileRepo = new FileRepository();

// Inject dependencies
const userServiceWithDb = new UserService(databaseRepo);
const userServiceWithFile = new UserService(fileRepo);

// Use the services
async function example() {
  await userServiceWithDb.createUser({
    name: 'John Doe',
    email: 'john@example.com'
  });

  await userServiceWithFile.createUser({
    name: 'Jane Doe',
    email: 'jane@example.com'
  });
}
```

## Examples

### Example 1: Payment Processing System

```typescript
// Abstraction
interface PaymentProcessor {
  processPayment(amount: number, details: PaymentDetails): Promise<PaymentResult>;
}

interface PaymentDetails {
  cardNumber?: string;
  email?: string;
  [key: string]: any;
}

interface PaymentResult {
  status: 'success' | 'failure';
  transactionId: string;
  error?: string;
}

// Low-level modules
class CreditCardProcessor implements PaymentProcessor {
  async processPayment(amount: number, details: PaymentDetails): Promise<PaymentResult> {
    console.log(`Processing $${amount} via Credit Card`);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      status: 'success',
      transactionId: `cc_${Date.now()}`
    };
  }
}

class PayPalProcessor implements PaymentProcessor {
  async processPayment(amount: number, details: PaymentDetails): Promise<PaymentResult> {
    console.log(`Processing $${amount} via PayPal`);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      status: 'success',
      transactionId: `pp_${Date.now()}`
    };
  }
}

class StripeProcessor implements PaymentProcessor {
  async processPayment(amount: number, details: PaymentDetails): Promise<PaymentResult> {
    console.log(`Processing $${amount} via Stripe`);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      status: 'success',
      transactionId: `stripe_${Date.now()}`
    };
  }
}

// High-level module
class OrderService {
  constructor(private paymentProcessor: PaymentProcessor) {}

  async completeOrder(orderAmount: number, paymentDetails: PaymentDetails): Promise<void> {
    // Business logic
    if (orderAmount <= 0) {
      throw new Error('Invalid order amount');
    }

    try {
      // Process payment using injected processor
      const result = await this.paymentProcessor.processPayment(orderAmount, paymentDetails);
      
      if (result.status === 'success') {
        console.log(`Order completed successfully. Transaction ID: ${result.transactionId}`);
        await this.finalizeOrder(result.transactionId);
      } else {
        console.log(`Order failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Payment processing failed:', error);
      throw error;
    }
  }

  private async finalizeOrder(transactionId: string): Promise<void> {
    // Additional order finalization logic
    console.log(`Finalizing order with transaction ${transactionId}`);
  }
}
```

### Example 2: Logging System

```typescript
enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

// Abstraction
interface Logger {
  log(level: LogLevel, message: string, meta?: any): void;
}

// Low-level modules
class FileLogger implements Logger {
  log(level: LogLevel, message: string, meta?: any): void {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [FILE] ${level}: ${message}`;
    console.log(logEntry, meta || '');
  }
}

class DatabaseLogger implements Logger {
  log(level: LogLevel, message: string, meta?: any): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [DATABASE] ${level}: ${message}`, meta || '');
    // In real implementation, save to database
  }
}

class ConsoleLogger implements Logger {
  log(level: LogLevel, message: string, meta?: any): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [CONSOLE] ${level}: ${message}`, meta || '');
  }
}

class CompositeLogger implements Logger {
  constructor(private loggers: Logger[]) {}

  log(level: LogLevel, message: string, meta?: any): void {
    this.loggers.forEach(logger => logger.log(level, message, meta));
  }
}

// High-level module
class ApplicationService {
  constructor(private logger: Logger) {}

  async performOperation(): Promise<void> {
    this.logger.log(LogLevel.INFO, 'Starting operation');

    try {
      const result = await this.doComplexWork();
      this.logger.log(LogLevel.INFO, 'Operation completed', { result });
    } catch (error) {
      this.logger.log(LogLevel.ERROR, 'Operation failed', { error: error.message });
      throw error;
    }
  }

  private async doComplexWork(): Promise<string> {
    // Simulate complex work
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 'Success';
  }
}
```

## Best Practices

### 1. Use Dependency Injection
```typescript
// Constructor injection (preferred)
class Service {
  constructor(private dependency: Interface) {}
}

// Method injection
class Service {
  performAction(dependency: Interface): void {
    dependency.doSomething();
  }
}

// Property injection
class Service {
  public dependency!: Interface;
  
  performAction(): void {
    this.dependency.doSomething();
  }
}
```

### 2. Define Clear Abstractions
```typescript
// Good: Clear, focused interface
interface EmailSender {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
}

// Bad: Too broad, unclear responsibility
interface CommunicationService {
  doCommunicationStuff(data: any): void;
}
```

### 3. Use Dependency Injection Containers
```typescript
class DIContainer {
  private services: Map<string, any> = new Map();

  register<T>(token: string, implementation: T): void {
    this.services.set(token, implementation);
  }

  resolve<T>(token: string): T {
    const service = this.services.get(token);
    if (!service) {
      throw new Error(`Service ${token} not found`);
    }
    return service;
  }
}

// Usage
const container = new DIContainer();
container.register('PaymentProcessor', new CreditCardProcessor());
container.register('Logger', new FileLogger());

const paymentService = new OrderService(
  container.resolve<PaymentProcessor>('PaymentProcessor')
);
```

### 4. Use TypeScript Decorators (with experimental decorators)
```typescript
// Define tokens
const TOKENS = {
  PaymentProcessor: Symbol('PaymentProcessor'),
  Logger: Symbol('Logger')
};

// Service with injected dependencies
class OrderService {
  constructor(
    @inject(TOKENS.PaymentProcessor) private paymentProcessor: PaymentProcessor,
    @inject(TOKENS.Logger) private logger: Logger
  ) {}
}
```

### 5. Keep Abstractions Stable
```typescript
// Good: Stable interface
interface DataRepository<T> {
  save(entity: T): Promise<void>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  delete(id: string): Promise<void>;
}

// Bad: Unstable interface that might change frequently
interface DataRepository {
  saveToMySQL(data: any): void;
  getFromMySQLWithComplexQuery(query: string): any;
}
```

## Common Violations

### 1. Direct Instantiation
```typescript
// BAD: Direct instantiation creates tight coupling
class OrderService {
  private paymentProcessor: PaymentProcessor;

  constructor() {
    this.paymentProcessor = new CreditCardProcessor(); // Violation!
  }
}
```

### 2. Concrete Type Dependencies
```typescript
// BAD: Depending on concrete type
class OrderService {
  constructor(private processor: CreditCardProcessor) {} // Should be interface
}

// GOOD: Depending on abstraction
class OrderService {
  constructor(private processor: PaymentProcessor) {}
}
```

### 3. Abstraction Depending on Details
```typescript
// BAD: Abstraction depends on implementation detail
interface PaymentProcessor {
  processCreditCard(cardNumber: string, cvv: string): void; // Too specific!
}

// GOOD: Abstraction independent of implementation
interface PaymentProcessor {
  processPayment(amount: number, details: PaymentDetails): Promise<PaymentResult>;
}
```

### 4. Importing Concrete Implementations in High-level Modules
```typescript
// BAD: High-level module importing low-level module
import { DatabaseRepository } from './database-repository';

class UserService {
  constructor() {
    this.repository = new DatabaseRepository(); // Violation!
  }
}

// GOOD: Only import abstractions
import { DataRepository } from './interfaces';

class UserService {
  constructor(private repository: DataRepository) {}
}
```

## Related Patterns

### 1. Dependency Injection Pattern
- Constructor Injection
- Setter Injection
- Interface Injection

### 2. Factory Pattern
- Abstract Factory
- Factory Method

### 3. Strategy Pattern
- Allows switching algorithms at runtime

### 4. Adapter Pattern
- Helps integrate different interfaces

## Resources

### Books
- "Clean Architecture" by Robert C. Martin
- "Dependency Injection in .NET" by Mark Seemann
- "Design Patterns" by Gang of Four

### Articles
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle)

### Tools
- [InversifyJS](https://inversify.io/) - IoC container for TypeScript
- [TSyringe](https://github.com/microsoft/tsyringe) - Dependency injection container
- [Nest.js](https://nestjs.com/) - Framework with built-in DI

---

**Remember**: The goal of DIP is to make your code more flexible, testable, and maintainable by depending on abstractions rather than concrete implementations.