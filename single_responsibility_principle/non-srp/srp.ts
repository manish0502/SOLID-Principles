//  Single Responsibility Principle (SRP)

/**
 * To compile or run TypeScript files:
 *
 * 1. Install dependencies locally (dev-only):
 *    npm install --save-dev typescript ts-node
 *
 * 2. Navigate to the project folder.
 *
 * 3. Run the TypeScript file using:
 *    npx ts-node --esm srp.ts
 *
 * Notes:
 * - `tsc` is used to compile TypeScript files to JavaScript.
 * - `ts-node` runs TypeScript files directly without compiling to JS.
 * - The `--esm` flag is required when using ES module syntax (`import/export`).
 */

import { Product , Order} from "./order.ts";

const product1 = new Product("1" ,"Laptop" ,10000)
const product2 = new Product("1" ,"Mobile" ,2000)

const order = new Order();
order.addProduct(product1)
order.addProduct(product2)

order.generateInvoice();
order.processPayment();

/**
 * Sample Output
 * Invoice Date: Thu Jun 26 2025
---------------------------------------------
Product Name    Price
Laptop          10000
Mobile          2000
---------------------------------------------
Total: 12000
Processing payement....
Payment processes Successfully!..
Added to accounting system!...
 */