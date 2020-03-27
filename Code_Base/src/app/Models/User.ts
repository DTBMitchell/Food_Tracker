export class User{
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;

    password: string;
    salt: string;

    constructor(){
        this.user_id = null;
        this.first_name = null;
        this.last_name = null;
        this.email = null;
        this.password = null;
        this.salt = null;
    }
}