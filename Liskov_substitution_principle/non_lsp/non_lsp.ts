/**
 * Definition: If class S is a subclass of class T, 
     then objects of type T should be replaceable with objects of type S without altering the correctness of the program.
  
In Simple Terms: You should be able to use a child class wherever a parent class is expected, and everything should work as expected.
 */

class Bird {
    fly(){
        console.log("Bird fly")
    }
    makeSound(){
        console.log("bird makes sound")
    }
}

class Aparrow extends Bird {
    fly(){
        console.log("Sparrow fly")
    }
    makeSound(){
        console.log("Sparrow Sound")
    }
}

class Penguin extends Bird {
    fly(){
        throw new Error("Penguin cannot fly")
    }
    makeSound(){
        console.log("Pemhuin Sound")
    }
}

// usage 

function makeBirdFly(bird :Bird){
   bird.fly();
   bird.makeSound()
}

//makeBirdFly(new Bird()) 
/**
   Bird fly
   bird makes sound
 */

// even we replace with the child class it should works as expected

//makeBirdFly(new Aparrow()) 
/**
 * Sparrow fly
   Sparrow Sound
 */

// here principle breaks
makeBirdFly(new Penguin()) 

/**
 *     throw new Error("Penguin cannot fly")
              ^
Error: Penguin cannot fly
    at Penguin.fly (/Users/m.giri/Desktop/Solid_principles/Liskov_substitution_principle/non_lsp/non_lsp.ts:28:15)
    at makeBirdFly (/Users/m.giri/Desktop/Solid_principles/Liskov_substitution_principle/non_lsp/non_lsp.ts:38:9)
    at Object.<anonymous> (/Users/m.giri/Desktop/Solid_principles/Liskov_substitution_principle/non_lsp/non_lsp.ts:57:1)
 */

/**
 * Why LSP is Violated Here
    The function makeBirdFly expects any Bird to be able to fly.
    Aparrow (a subclass) works fine, as it can fly.
    Penguin (a subclass) throws an error when fly() is called, breaking the expectation that all Birds can fly.

This means:
   You cannot safely substitute a Penguin wherever a Bird is expected, 
   because it does not fulfill the contract of the parent class (Bird). This violates the Liskov Substitution Principle.
 */