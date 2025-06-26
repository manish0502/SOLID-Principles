# Order System – Single Responsibility Principle (SRP) Example

## Overview

This project demonstrates the **Single Responsibility Principle (SRP)** from SOLID principles in an Order Management System. Each class/service is responsible for only one aspect of the business logic, making the codebase easier to maintain, test, and extend.

## Real-World Analogy

Think of this system like different departments in a company:
- **Inventory Department:** Manages products in the order
- **Accounting Department:** Calculates prices and taxes
- **Billing Department:** Generates invoices
- **Payment Processing:** Handles payment transactions

## Project Structure

```
├── product.ts           # Product entity
├── order.ts             # Order entity (holds products)
├── inventoryService.ts  # Manages adding/removing products
├── accountingService.ts # Calculates totals and taxes
├── invoiceService.ts    # Generates invoice
├── paymentService.ts    # Processes payments
├── main.ts              # Usage example
└── README.md            # This file
```

## Code Implementation

### Product Entity (`product.ts`)
```typescript
export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number
  ) {}
}
```

### Order Entity (`order.ts`)
```typescript
import { Product } from './product.js';

export class Order {
  private products: Product[] = [];
  
  constructor(public orderId: string) {}
  
  getProducts(): Product[] { 
    return this.products; 
  }
}
```

### Inventory Service (`inventoryService.ts`)
```typescript
import { Order } from './order.js';
import { Product } from './product.js';

export class InventoryService {
  addProduct(order: Order, product: Product): void {
    order.getProducts().push(product);
  }
  
  removeProduct(order: Order, productId: string): void {
    const products = order.getProducts();
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) products.splice(index, 1);
  }
}
```

### Accounting Service (`accountingService.ts`)
```typescript
import { Order } from './order.js';

export class AccountingService {
  calculateTotal(order: Order): number {
    return order.getProducts().reduce((sum, p) => sum + p.price, 0);
  }
  
  calculateTax(order: Order): number {
    return this.calculateTotal(order) * 0.18; // Example: 18% GST
  }
}
```

### Invoice Service (`invoiceService.ts`)
```typescript
import { Order } from './order.js';
import { AccountingService } from './accountingService.js';

export class InvoiceService {
  static generateInvoice(order: Order, accounting: AccountingService): string {
    const lines = [
      `Invoice Date: ${new Date().toDateString()}`,
      "---------------------------------------------",
      "Product Name\tPrice",
      ...order.getProducts().map(p => `${p.name}\t\t${p.price}`),
      "---------------------------------------------",
      `Subtotal: ${accounting.calculateTotal(order)}`,
      `Tax: ${accounting.calculateTax(order)}`,
      `Total: ${accounting.calculateTotal(order) + accounting.calculateTax(order)}`,
    ];
    return lines.join('\n');
  }
}
```

### Payment Service (`paymentService.ts`)
```typescript
export class PaymentService {
  static processPayment(amount: number): void {
    console.log("Processing payment...");
    console.log(`Payment of ${amount} processed successfully!`);
    console.log("Added to accounting system!");
    console.log("Email sent to customer!");
  }
}
```

### Usage Example (`main.ts`)
```typescript
import { Product } from './product.js';
import { Order } from './order.js';
import { InventoryService } from './inventoryService.js';
import { AccountingService } from './accountingService.js';
import { InvoiceService } from './invoiceService.js';
import { PaymentService } from './paymentService.js';

// Create order and services
const order = new Order("ORD-001");
const inventory = new InventoryService();
const accounting = new AccountingService();

// Add products
const product1 = new Product("1", "Laptop", 10000);
const product2 = new Product("2", "Mobile", 2000);

inventory.addProduct(order, product1);
inventory.addProduct(order, product2);

// Generate invoice
const invoice = InvoiceService.generateInvoice(order, accounting);
console.log(invoice);

// Process payment
const total = accounting.calculateTotal(order) + accounting.calculateTax(order);
PaymentService.processPayment(total);
```

## How to Run

1. Clone the repository
2. Install Node.js and TypeScript
3. Compile TypeScript files: `tsc *.ts`
4. Run the example: `node main.js`

## Key Takeaways

- **SRP Compliance:** Each class/service has only one reason to change
- **Maintainability:** Changes in one area don't affect others
- **Testability:** Each class can be tested independently
- **Extensibility:** Easy to add new features or change logic in one area

## Benefits of This Approach

- **Separation of Concerns:** Each service handles one specific responsibility
- **Loose Coupling:** Services are independent and can be modified without affecting others
- **High Cohesion:** Related functionality is grouped together
- **Easy Testing:** Each service can be unit tested in isolation

*This project is a practical demonstration of how to apply the Single Responsibility Principle in a real-world scenario!*

## License

MIT License - Feel free to use this code for educational purposes.