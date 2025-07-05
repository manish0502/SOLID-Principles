/**
    BaseBird is the parent class for all birds and only includes behaviors that all birds share (like makeSound()).
    flyingBird extends BaseBird and adds the fly() method, but only for birds that can actually fly.
    Aparrow (a flying bird) extends flyingBird and implements both fly() and makeSound().
    Penguins extends BaseBird and only implements makeSound(), since penguins cannot fly.

 */

class BaseBird {
    makeSound(){
        console.log("Bird makes sound")
    }
}
class flyingBird extends BaseBird{
    fly(){
        console.log("flying brids can fly")
    }
}

class Aparrow extends flyingBird{
    fly(){
        console.log("Aparrow can fly")
    }
    makeSound() {
        console.log("Aparrow can sound")
    }
}

class Penguins extends BaseBird{
    makeSound() {
        console.log("Penguins can make sounds")
    }
}

// usage 

function letBirdMakeSound(bird :BaseBird){
    bird.makeSound();
}
function letBirdFly(flyingBird: flyingBird){
    flyingBird.fly()
    flyingBird.makeSound()
}


letBirdMakeSound(new Penguins()) // Penguins can make sounds
letBirdFly(new Aparrow()) // Aparrow can fly ,Aparrow can sound

//letBirdFly(new Penguins()) // TypeScript/JS will error: Penguins does not have fly()

/**
 * Why This Satisfies LSP
    Any function expecting a BaseBird can accept both Aparrow and Penguins without error.
    Only birds that can fly are passed to functions expecting flyingBird, so you never get runtime errors for non-flying birds.
    You have separated the behaviors so subclasses do not have to implement methods they cannot support.

  This is the correct way to model such hierarchies and fully respects the Liskov Substitution Principle.


 */