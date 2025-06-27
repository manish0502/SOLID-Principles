/* 
The Open-Closed Principle is the second principle of SOLID design principles. It means:
    Open for Extension: You should be able to add new functionality
    Closed for Modification: You shouldn't need to modify existing, working code
how to run - > cd Open_close_principle/non_ocp/non_ocp.ts
then run -> npx ts-node non_ocp.ts
*/

class AreaCalculator {
    
    calculateArea(shapes){
        let totalArea =0;
        for(let shape of shapes){
            if(shape.type === "rectangle"){
                totalArea += shape.width * shape.height;
            }
            else if(shape.type ==="circle"){
                totalArea += Math.PI * shape.radius* shape.radius
            }
            else if(shape.type ==="triangle"){
                totalArea += 0.5 * shape.base *shape.height
            }
            // What if we want to add more shapes? We keep modifying this class!
        }
        return totalArea
    }
}


// usage 

let calculator = new AreaCalculator();
let shapes =[
    { type :"rectangle" , width: 10 , height:5},
    { type :"circle" , radius : 7},
    { type :"triangle" , base: 6 , height :8}
]

console.log(calculator.calculateArea(shapes)) //227.93804002589985


/*
 Problems with this approach:

    Every new shape requires modifying the AreaCalculator class
    Risk of breaking existing functionality
    Violates Single Responsibility Principle as well
    Hard to test individual shape calculations
*/