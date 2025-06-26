import { Order} from "./order"
import { AccountingService } from "./AccountingService";


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