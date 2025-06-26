import {Order} from './order';
import { Product } from './product';

export class inventoryService {
    addProduct(order :Order ,product :Product){
       order.getProducts().push(product);
    }
    removeProduct(order :Order ,productId :string){
        const products = order.getProducts();
        const index = products.findIndex(d => d.id == productId)
        if(index !== -1){
            products.splice(index ,1)
        }
    }
}