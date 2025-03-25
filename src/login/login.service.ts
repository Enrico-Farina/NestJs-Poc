import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { usuarios } from './usuarios.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { UserReturn } from './dto/userReturn.dto';

import { UserRegister } from './dto/userRegister.dto';
import { UserUpdate } from './dto/userUpdate.dto';
import { UserSigIn } from './dto/userSignIn.dto';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(usuarios)
        private usuariosRepository: Repository<usuarios>,
        private readonly emailService: EmailService,
        private jwtService: JwtService
    ) {
    }

    /**
     * This function cover all DB Requests with try/catch validation.
     * @param action Promise to be maked.
     * @returns the promisse callback.
     */
    async executePromises<T>(action: () => Promise<T>): Promise<T> {
        try {
            return await action();
        } catch (e) {
            console.log('Log do erro: ' + e);
            throw new HttpException(
                { message: 'Erro ao salvar dados no banco.' },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async signIn(user: UserSigIn) {
        const userDB = await this.findUserByEmail(user.email);
        const jwt = this.jwtService;

        await bcrypt.compare(user.password, userDB.password).then(function(result) {
            if (!result) 
                throw new HttpException(
                    {message: 'Senha ou email incorretos.'},
                    HttpStatus.FORBIDDEN)
        });

        const payload = { sub: userDB.id, username: userDB.name };

        return {
            access_token: await jwt.signAsync(payload),
            message: 'Usuário logado com sucesso.'
            };
    }

    /**
     * This function register a new user.
     * @param user User to be saved.
     * @returns promisse callback.
     */
    async saveUser(user: UserRegister) {

        let userDB = {
            id: 0,
            email: '',
            name: ''
        };

        const saltRounds = 7
        await bcrypt.hash(user.password, saltRounds).then(function(hash) {
            user.password = hash
        });

        await this.executePromises(async () => {
            userDB = await this.usuariosRepository.save(user);
        });

        return {
            user: new UserReturn(userDB),
            message: 'Usuário registrado com sucesso.',
        };
    }
    

    /**
     * this function update an existent user.
     * @param id existent user id
     * @param user existent user data
     * @returns promise callback.
     */
    async updateUser(id: number, user: Partial<UserUpdate>) {
        const userToUpdate = await this.findUserById(id);

        Object.entries(user).map(([key, value]) => {
            userToUpdate[key] = value;
        })

        await this.executePromises(async () => {
            await this.usuariosRepository.save(userToUpdate);
        });

        return {
            user: new UserReturn(userToUpdate),
            message: 'Usuário atualizado com sucesso.'
        }  
    }

    /**
     * This function delete an existent user.
     * @param id user id.
     * @param pass user password.
     * @returns promise callback.
     */
    async deleteUser(id: number, pass: string) {
        const userToDelete = await this.findUserById(id);

        if (userToDelete.password != pass)
            throw new HttpException(
                {message: 'Senha incorreta.'},
                HttpStatus.FORBIDDEN)

        await this.executePromises(async () => {
            await this.usuariosRepository.delete(id);
        });

        return {
            user: new UserReturn(userToDelete),
            message: 'Usuário deletado permanentemente.'
        }  
    }

    /**
     * This function find a user by id
     * @param id user id
     * @returns the finded user
     */
    async findUserById(id: number) {
        const user = await this.usuariosRepository.findOne({ where: { id: id } })

        if (!user) 
            throw new HttpException(
                { message: 'Usuário não encontrado.'},
                HttpStatus.NOT_FOUND);

        return user;
    }

    /**
     * This function find a user by email
     * @param email user email
     * @returns the finded user
     */
    async findUserByEmail(email: string) {
        const user = await this.usuariosRepository.findOne({ where: { email: email } })

        if (!user) 
            throw new HttpException(
                { message: 'Usuário não encontrado.'},
                HttpStatus.NOT_FOUND);

        return user;
    }

}