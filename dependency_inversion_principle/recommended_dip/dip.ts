interface IUserRepository {
    getUser(id: string): any;
    saveUser(user: any): any;
}

interface IUserService {
    getUser(id: string): any;
    saveUser(user: any): any;
}

class UserUseRepository implements IUserRepository {
    getUser(id: string) {
        return { id, name: "Alice" };
    }

    saveUser(user: any) {
        console.log("saving user", user);
        return { name: "Manish", email: "manish@gmail.com" };
    }
}

class UserUseService implements IUserService {
    constructor(private repo: IUserRepository) {}

    getUser(id: string) {
        return this.repo.getUser(id);
    }

    saveUser(user: any) {
        return this.repo.saveUser(user);
    }
}

class UserUseController {
    constructor(private service: IUserService) {}

    getUser(id: string) {
        const user = this.service.getUser(id);
        console.log("getUser result:", user);
        return user;
    }

    saveUser(user: any) {
        const userObj = this.service.saveUser(user);
        console.log("saveUser result:", userObj);
        return userObj;
    }
}

// 
const repo = new UserUseRepository();
const service = new UserUseService(repo);
const controller = new UserUseController(service);

console.log(controller.getUser("1"));
console.log(controller.saveUser({
    name: "Manish",
    email: "manish@gmail.com"
}));

