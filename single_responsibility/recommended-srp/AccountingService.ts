import {Order } from "./order"
export class AccountingService {

    calculateTotal(order:Order) : number{
      return order.getProducts().reduce((sum , p)=> sum+p.price ,0)
    }
    calculateTax(order :Order) :number{
      return this.calculateTotal(order)*0.18; //GST
    }
}
