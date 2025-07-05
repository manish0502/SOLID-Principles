/**
 * Interface Segregation Principle (ISP)

Definition:
   Clients should not be forced to depend on interfaces they do not use.

In Simple Terms:
    It's better to have several small, specific interfaces than a large, general-purpose one.
    Classes should only implement methods that are relevant to them.

 Example: Violating ISP
          Suppose you have a single interface for all birds:
 */

interface Bird {
   fly():void;
   swim(): void ;
   makeSound():void;
}

class Duck implements Bird {
   fly() { console.log("Duck flies"); }
   swim() { console.log("Duck swims"); }
   makeSound() { console.log("Quack"); }
}

class Penguinss implements Bird {
   fly() { throw new Error("Penguin can't fly"); } // Not relevant!
   swim() { console.log("Penguin swims"); }
   makeSound() { console.log("Penguin sound"); }
}

//usage

const duck = new Duck();
duck.fly();        // Output: Duck flies
duck.swim();       // Output: Duck swims
duck.makeSound();  // Output: Quack

const penguin = new Penguinss();
penguin.swim();       // Output: Penguin swims
penguin.makeSound();  // Output: Penguin sound
penguin.fly();        // Throws Error: Penguin can't fly

/**
 * Problem:
      Penguin is forced to implement fly(), which it cannot do.
      This leads to awkward or error-prone code.
      Solution: Split the interfaces so each class only implements what it needs.
 */