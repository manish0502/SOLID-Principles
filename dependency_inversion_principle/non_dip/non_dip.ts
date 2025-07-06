/**


Dependency Inversion Principle (DIP)
        Non-DIP (Tightly Coupled):
        controller --> service --> repository (db layer)
        High-level modules (controller) depend directly on low-level modules (repository).
        Changes in the repository can break the controller.
        The system is tightly coupled and hard to test or extend.


DIP (Decoupled, Flexible):
    controller --> IService <-- service --> IRepository <-- repository (db layer)
    High-level and low-level modules depend on abstractions (interfaces), not on each other.
    You can swap implementations without changing the controller or service.
    The system is loosely coupled, easier to test, and more maintainable.
 
*/

// VIOLATION: Without Dependency Inversion
// High-level modules depend on low-level modules

class UserRepository {
    getUser(id) {
        return { id, name: "Alice" };
    }

    saveUser(user) {
        return {user };
    }
}

class UserService {
   private repo :  UserRepository;
    constructor() {
        this.repo = new UserRepository();
    }
    getUser(id) {
        return this.repo.getUser(id);
    }

    saveUser(user) {
        return this.repo.saveUser(user);
    }
}

class UserController {
    private service : UserService;
    constructor() {
        this.service = new UserService();
    }

    getUser(id) {
        const user = this.service.getUser(id);
        console.log("getUser result:", user);
        return user;
    }

    saveUser(user) {
        const userObj = this.service.saveUser(user);
        console.log("saveUser result:", userObj);
        return userObj;
    }
}

// usage 
const userDetails = new UserController();
userDetails.getUser("1");
userDetails.saveUser({
    name: "Manish",
    email: "manishkr@gmail.com"
});