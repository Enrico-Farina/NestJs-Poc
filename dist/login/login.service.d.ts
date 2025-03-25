import { usuarios } from './usuarios.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { UserReturn } from './dto/userReturn.dto';
import { UserRegister } from './dto/userRegister.dto';
import { UserUpdate } from './dto/userUpdate.dto';
import { UserSigIn } from './dto/userSignIn.dto';
import { JwtService } from '@nestjs/jwt';
export declare class LoginService {
    private usuariosRepository;
    private readonly emailService;
    private jwtService;
    constructor(usuariosRepository: Repository<usuarios>, emailService: EmailService, jwtService: JwtService);
    executePromises<T>(action: () => Promise<T>): Promise<T>;
    signIn(user: UserSigIn): Promise<{
        access_token: string;
        message: string;
    }>;
    saveUser(user: UserRegister): Promise<{
        user: UserReturn;
        message: string;
    }>;
    updateUser(id: number, user: Partial<UserUpdate>): Promise<{
        user: UserReturn;
        message: string;
    }>;
    deleteUser(id: number, pass: string): Promise<{
        user: UserReturn;
        message: string;
    }>;
    findUserById(id: number): Promise<usuarios>;
    findUserByEmail(email: string): Promise<usuarios>;
}
