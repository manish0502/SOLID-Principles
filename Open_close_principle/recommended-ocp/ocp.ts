//Follows Open-Closed Principle

// Base Shape interface
class Shape {
   calculateArea(){
     throw new Error("calculateArea must be implemented")
   }
}

class Rectangle extends Shape{
    private width : number;
    private height :number
    constructor(width, height){
        super();
        this.width = width;
        this.height = height
    }
    calculateArea(){
        return this.width * this.height
    }
}
class Circle extends Shape {
    private radius : number ;
    constructor(radius){
        super();
        this.radius =radius
    }

    calculateArea(){
        return Math.PI *this.radius*this.radius
    }

}
class Triangle extends Shape {
     private base :number;
     private height : number
     constructor(base , height){
        super();
        this.base = base;
        this.height= height
     }
     calculateArea() {
         return 0.5 * this.base * this.height
     }
}



// Calculator that is closed for modification but open for extension
class AreaCalculator2 {
    calculateArea(shapes) {
      return shapes.reduce((total ,shape) =>{
            return total + shape.calculateArea();
      },0)
    }
  }

// Easy to extend with new shapes without modifying existing code!
class Hexagon extends Shape {
    private side : number;
    private apothem : number 

    constructor(side ,apothem){
        super();
        this.side = side ;
        this.apothem = apothem
    }
    calculateArea() {
        return 3*this.side *this.apothem
    }
}



const calculator2 = new AreaCalculator2();
const shapes2 = [
  new Rectangle(10, 5),
  new Circle(7),
  new Triangle(6, 8),
  new Hexagon(4, 3.46) // New shape added without modifying AreaCalculator!
];
console.log(calculator2.calculateArea(shapes2)); // 269.45804002589983
