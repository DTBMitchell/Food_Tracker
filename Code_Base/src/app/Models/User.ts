import { JwtModule } from '@auth0/angular-jwt';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class User{
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    birthday: Date;

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