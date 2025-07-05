import { Product } from "./product.ts";

export class Order {
   private products : Product[] =[];
   constructor(public orderId :string) {};

   getProducts():Product[] {
      return this.products;
   }
}