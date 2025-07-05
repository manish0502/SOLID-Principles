# Interface Segregation Principle (ISP)

## 🎯 Overview

The Interface Segregation Principle is the fourth principle of the SOLID design principles. It states that **clients should not be forced to depend on interfaces they do not use**. This principle promotes the creation of small, specific interfaces rather than large, monolithic ones.

## 📖 Definition

> "Clients should not be forced to depend on interfaces they do not use."
> 
> **In Simple Terms:** It's better to have several small, specific interfaces than a large, general-purpose one. Classes should only implement methods that are relevant to them.

## 🚫 Bad Example: Violating ISP

Here's an example that violates the Interface Segregation Principle:

```typescript
interface Bird {
    fly(): void;
    swim(): void;
    makeSound(): void;
}

class Duck implements Bird {
    fly() { 
        console.log("Duck flies"); 
    }
    
    swim() { 
        console.log("Duck swims"); 
    }
    
    makeSound() { 
        console.log("Quack"); 
    }
}

class Penguin implements Bird {
    fly() { 
        throw new Error("Penguin can't fly"); // Not relevant!
    }
    
    swim() { 
        console.log("Penguin swims"); 
    }
    
    makeSound() { 
        console.log("Penguin sound"); 
    }
}
```

### Problems with this approach:
- The `Penguin` class is forced to implement the `fly()` method even though penguins cannot fly
- This creates unnecessary dependencies and potential runtime errors
- The interface is too broad and doesn't match the specific needs of each class

## ✅ Good Example: Following ISP

Here's the same example refactored to follow the Interface Segregation Principle:

```typescript
// Segregated interfaces
interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

interface SoundMaker {
    makeSound(): void;
}

// Duck can fly, swim, and make sound
class Duck implements Flyable, Swimmable, SoundMaker {
    fly() { 
        console.log("Duck flies"); 
    }
    
    swim() { 
        console.log("Duck swims"); 
    }
    
    makeSound() { 
        console.log("Quack"); 
    }
}

// Penguin can only swim and make sound
class Penguin implements Swimmable, SoundMaker {
    swim() { 
        console.log("Penguin swims"); 
    }
    
    makeSound() { 
        console.log("Penguin sound"); 
    }
}

// Eagle can only fly and make sound
class Eagle implements Flyable, SoundMaker {
    fly() { 
        console.log("Eagle soars"); 
    }
    
    makeSound() { 
        console.log("Eagle screech"); 
    }
}
```

## 🏗️ Real-World Example

Consider a user management system:

### ❌ Violating ISP:
```typescript
interface UserService {
    createUser(user: User): void;
    deleteUser(id: string): void;
    updateUser(user: User): void;
    getUserById(id: string): User;
    sendEmail(email: string): void;
    generateReport(): string;
    exportData(): void;
}
```

### ✅ Following ISP:
```typescript
interface UserCrudService {
    createUser(user: User): void;
    deleteUser(id: string): void;
    updateUser(user: User): void;
    getUserById(id: string): User;
}

interface EmailService {
    sendEmail(email: string): void;
}

interface ReportService {
    generateReport(): string;
}

interface DataExportService {
    exportData(): void;
}
```

## 🎯 Benefits of ISP

1. **Reduced Coupling**: Classes only depend on methods they actually use
2. **Easier Testing**: Smaller interfaces are easier to mock and test
3. **Better Maintainability**: Changes to one interface don't affect unrelated classes
4. **Clearer Code**: Interfaces have a single, well-defined purpose
5. **Flexible Design**: Easy to add new implementations without breaking existing code

## 🔧 Implementation Guidelines

1. **Keep interfaces focused**: Each interface should have a single responsibility
2. **Use composition**: Combine multiple small interfaces when needed
3. **Avoid fat interfaces**: If an interface has many methods, consider splitting it
4. **Think from the client's perspective**: Design interfaces based on what clients need
5. **Regular refactoring**: Review and split interfaces as requirements evolve

## 📋 Checklist for ISP Compliance

- [ ] Each interface has a single, well-defined purpose
- [ ] No class is forced to implement methods it doesn't need
- [ ] Interface methods are cohesive and related
- [ ] Clients depend only on methods they use
- [ ] Interfaces are easy to understand and implement

## 🔗 Related SOLID Principles

- **Single Responsibility Principle (SRP)**: Both promote focused, single-purpose design
- **Dependency Inversion Principle (DIP)**: ISP helps create better abstractions for DIP
- **Open/Closed Principle (OCP)**: Small interfaces make it easier to extend functionality

## 🚀 Getting Started

1. Clone this repository
2. Review the code examples
3. Run the examples to see ISP in action
4. Practice by refactoring your own code to follow ISP

## 📚 Additional Resources

- [SOLID Principles Explained](https://example.com)
- [Clean Code Best Practices](https://example.com)
- [Interface Design Patterns](https://example.com)

## 🤝 Contributing

Feel free to contribute examples, improvements, or additional explanations. Please follow the existing code style and include tests for new examples.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Remember**: The Interface Segregation Principle helps create more maintainable, flexible, and testable code by ensuring that classes only depend on the functionality they actually need.