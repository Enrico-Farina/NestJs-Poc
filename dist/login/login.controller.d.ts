import { LoginService } from './login.service';
import { UserRegister } from './dto/userRegister.dto';
import { UserUpdate } from './dto/userUpdate.dto';
import { UserSigIn } from './dto/userSignIn.dto';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    loginEndPoint(): string;
    signIn(user: UserSigIn): Promise<{
        access_token: string;
        message: string;
    }>;
    isValidToken(req: any): Promise<any>;
    createUser(user: UserRegister): Promise<{
        user: import("./dto/userReturn.dto").UserReturn;
        message: string;
    }>;
    updateUser(id: number, user: UserUpdate): Promise<{
        user: import("./dto/userReturn.dto").UserReturn;
        message: string;
    }>;
    deleteUser(id: number, password: string): Promise<{
        user: import("./dto/userReturn.dto").UserReturn;
        message: string;
    }>;
}
