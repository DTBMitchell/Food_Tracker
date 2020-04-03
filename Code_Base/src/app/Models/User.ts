export class User{
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    birthday: Date;
    idToken: string;

    password: string;

    constructor(){
        this.user_id = null;
        this.first_name = null;
        this.last_name = null;
        this.email = null;
        this.password = null;
        this.birthday =null;
    }
}