export class Product {
  id: string;
  name: string;
  price: number;

  constructor(id : string , name :string ,price :number){
    this.id = id;
    this.name = name ;
    this.price = price;
  }
}

export class Order {
  products: Product[] = [];

  addProduct(product: Product) {
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  removeProduct(productId: string) {
    this.products = this.products.filter((product) => product.id != productId);
  }

  getProductPrice(productId: string) {
    const product = this.products.find((product) => product.id == productId);
    return product ? product.price : undefined;
  }

  calculatePrice() {
    return this.products.reduce((total, product) => total + product.price, 0);
  }

  //    generateInvoice(){
  //     console.log(`
  //        Invoice Date :  ${ new Date().toDateString()}
  //          ---------------------------------------------

  //          Product Name\tPrice
  //         `)
  //         this.products.forEach((product)=>{
  //             console.log(`${product.name}\t\t${product.price}`)
  //         })

  //         console.log("-----------------------------")
  //         console.log(`Total : ${this.calculatePrice()}`)

  //    }

  generateInvoice(): void {
    const lines = [
      `Invoice Date: ${new Date().toDateString()}`,
      "---------------------------------------------",
      "Product Name\tPrice",
      ...this.products.map((product) => `${product.name}\t\t${product.price}`),
      "---------------------------------------------",
      `Total: ${this.calculatePrice()}`,
    ];
    console.log(lines.join("\n"));
  }

  processPayment() {
    console.log("Processing payement....");
    console.log("Payment processes Successfully!..");
    console.log("Added to accounting system!...");
    console.log("Email sent to customer");
  }
}
