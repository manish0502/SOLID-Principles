import { Product } from './product.js';
import { Order } from './order.js';
import { inventoryService } from './InventoryService.js';
import { AccountingService } from './AccountingService.js';
import { InvoiceService } from './InvoiceService.js';
import { PaymentService } from './PaymentService.js';

const order = new Order("ORD-001");
const inventory = new inventoryService();
const accounting = new AccountingService();

const product1 = new Product("1", "Laptop", 10000);
const product2 = new Product("2", "Mobile", 2000);

inventory.addProduct(order, product1);
inventory.addProduct(order, product2);

const invoice = InvoiceService.generateInvoice(order, accounting);
console.log(invoice);

const total = accounting.calculateTotal(order) + accounting.calculateTax(order);
PaymentService.processPayment(total);

/**
 * Invoice Date: Thu Jun 26 2025
---------------------------------------------
Product Name    Price
Laptop          10000
Mobile          2000
---------------------------------------------
Subtotal: 12000
Tax: 2160
Total: 14160
Processing payment...
Payment of 14160 processed successfully!
Added to accounting system!
Email sent to customer!
 */