/**
 * Duck implements all three interfaces.
   Penguin only implements what it can do (swim and makeSound), not fly.

 */
interface CanFly {
    fly(): void;
}
interface CanSwim {
    swim(): void;
}
interface CanMakeSound {
    makeSound(): void;
}

class Duckss implements CanFly, CanSwim, CanMakeSound {
    fly() { console.log("Duck flies"); }
    swim() { console.log("Duck swims"); }
    makeSound() { console.log("Quack"); }
}

class Penguinsss implements CanSwim, CanMakeSound {
    swim() { console.log("Penguin swims"); }
    makeSound() { console.log("Penguin sound"); }
}


const ducks = new Duckss();
ducks.fly();        // Output: Duck flies
ducks.swim();       // Output: Duck swims
ducks.makeSound();  // Output: Quack

const penguins = new Penguinsss();
penguins.swim();       // Output: Penguin swims
penguins.makeSound();  // Output: Penguin sound
// penguins.fly();     //  Compile-time error: Property 'fly' does not exist on type 'Penguinsss'