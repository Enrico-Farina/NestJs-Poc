"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuarios_entity_1 = require("./usuarios.entity");
const typeorm_2 = require("typeorm");
const email_service_1 = require("../email/email.service");
const userReturn_dto_1 = require("./dto/userReturn.dto");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let LoginService = class LoginService {
    constructor(usuariosRepository, emailService, jwtService) {
        this.usuariosRepository = usuariosRepository;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }
    async executePromises(action) {
        try {
            return await action();
        }
        catch (e) {
            console.log('Log do erro: ' + e);
            throw new common_1.HttpException({ message: 'Erro ao salvar dados no banco.' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async signIn(user) {
        const userDB = await this.findUserByEmail(user.email);
        const jwt = this.jwtService;
        await bcrypt.compare(user.password, userDB.password).then(function (result) {
            if (!result)
                throw new common_1.HttpException({ message: 'Senha ou email incorretos.' }, common_1.HttpStatus.FORBIDDEN);
        });
        const payload = { sub: userDB.id, username: userDB.name };
        return {
            access_token: await jwt.signAsync(payload),
            message: 'Usuário logado com sucesso.'
        };
    }
    async saveUser(user) {
        let userDB = {
            id: 0,
            email: '',
            name: ''
        };
        const saltRounds = 7;
        await bcrypt.hash(user.password, saltRounds).then(function (hash) {
            user.password = hash;
        });
        await this.executePromises(async () => {
            userDB = await this.usuariosRepository.save(user);
        });
        return {
            user: new userReturn_dto_1.UserReturn(userDB),
            message: 'Usuário registrado com sucesso.',
        };
    }
    async updateUser(id, user) {
        const userToUpdate = await this.findUserById(id);
        Object.entries(user).map(([key, value]) => {
            userToUpdate[key] = value;
        });
        await this.executePromises(async () => {
            await this.usuariosRepository.save(userToUpdate);
        });
        return {
            user: new userReturn_dto_1.UserReturn(userToUpdate),
            message: 'Usuário atualizado com sucesso.'
        };
    }
    async deleteUser(id, pass) {
        const userToDelete = await this.findUserById(id);
        if (userToDelete.password != pass)
            throw new common_1.HttpException({ message: 'Senha incorreta.' }, common_1.HttpStatus.FORBIDDEN);
        await this.executePromises(async () => {
            await this.usuariosRepository.delete(id);
        });
        return {
            user: new userReturn_dto_1.UserReturn(userToDelete),
            message: 'Usuário deletado permanentemente.'
        };
    }
    async findUserById(id) {
        const user = await this.usuariosRepository.findOne({ where: { id: id } });
        if (!user)
            throw new common_1.HttpException({ message: 'Usuário não encontrado.' }, common_1.HttpStatus.NOT_FOUND);
        return user;
    }
    async findUserByEmail(email) {
        const user = await this.usuariosRepository.findOne({ where: { email: email } });
        if (!user)
            throw new common_1.HttpException({ message: 'Usuário não encontrado.' }, common_1.HttpStatus.NOT_FOUND);
        return user;
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuarios_entity_1.usuarios)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService,
        jwt_1.JwtService])
], LoginService);
//# sourceMappingURL=login.service.js.map