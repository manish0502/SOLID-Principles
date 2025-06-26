export class PaymentService {
    static processPayment(amount: number): void {
      console.log("Processing payment...");
      console.log(`Payment of ${amount} processed successfully!`);
      console.log("Added to accounting system!");
      console.log("Email sent to customer!");
    }
  }