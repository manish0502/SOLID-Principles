
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
