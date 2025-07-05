# Order System - Single Responsibility Principle (SRP) Example

## Overview

This project demonstrates the Single Responsibility Principle (SRP) violation in an Order management system and provides guidance on how to refactor it for better maintainability and design.

## Current Implementation

### Files Structure
```
├── order.ts      # Contains Product and Order classes
├── srp.ts        # Demo usage of the Order system
└── README.md     # This file
```

### Classes

#### Product Class
```typescript
export class Product {
  id: string;
  name: string;
  price: number;
  
  constructor(id: string, name: string, price: number)
}
```

#### Order Class (Current Implementation)
The `Order` class currently handles multiple responsibilities:
- **Product Management**: Adding, removing, and retrieving products
- **Price Calculation**: Computing total order amount
- **Invoice Generation**: Creating and displaying invoices
- **Payment Processing**: Handling payment workflow

## The Problem: SRP Violation

### What is Single Responsibility Principle?
> "A class should have only one reason to change."

### Why Our Current Order Class Violates SRP

Our `Order` class has **multiple reasons to change**:

1. **Product Management Changes**: If we need to modify how products are stored or managed
2. **Pricing Logic Changes**: If we need to add discounts, taxes, or complex pricing rules
3. **Invoice Format Changes**: If we need to change invoice layout or add new fields
4. **Payment Processing Changes**: If we integrate with different payment gateways

### Real-World Analogy
In a real business:
- **Inventory Department** manages products
- **Accounting Department** calculates prices and taxes
- **Billing Department** generates invoices
- **Payment Processing Department** handles transactions

Each department has different responsibilities and reasons to change.

## Current Usage Example

```typescript
import { Product, Order } from "./order.ts";

const product1 = new Product("1", "Laptop", 10000);
const product2 = new Product("2", "Mobile", 2000);

const order = new Order();
order.addProduct(product1);
order.addProduct(product2);

order.generateInvoice();
order.processPayment();
```

### Sample Output
```
Invoice Date: Thu Jun 26 2025
---------------------------------------------
Product Name    Price
Laptop          10000
Mobile          2000
---------------------------------------------
Total: 12000
Processing payment....
Payment processed Successfully!..
Added to accounting system!...
Email sent to customer
```
