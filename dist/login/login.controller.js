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
exports.LoginController = void 0;
const common_1 = require("@nestjs/common");
const login_service_1 = require("./login.service");
const userRegister_dto_1 = require("./dto/userRegister.dto");
const userUpdate_dto_1 = require("./dto/userUpdate.dto");
const userSignIn_dto_1 = require("./dto/userSignIn.dto");
const login_guard_1 = require("./guard/login.guard");
let LoginController = class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
    }
    loginEndPoint() {
        return 'Login is Working';
    }
    async signIn(user) {
        const response = await this.loginService.signIn(user);
        return response;
    }
    async isValidToken(req) {
        return req.user;
    }
    async createUser(user) {
        const respose = await this.loginService.saveUser(user);
        return respose;
    }
    async updateUser(id, user) {
        const response = await this.loginService.updateUser(id, user);
        return response;
    }
    async deleteUser(id, password) {
        const response = await this.loginService.deleteUser(id, password);
        return response;
    }
};
exports.LoginController = LoginController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], LoginController.prototype, "loginEndPoint", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userSignIn_dto_1.UserSigIn]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "signIn", null);
__decorate([
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    (0, common_1.Get)('isvalidtoken'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "isValidToken", null);
__decorate([
    (0, common_1.Post)('createuser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userRegister_dto_1.UserRegister]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)('updateuser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, userUpdate_dto_1.UserUpdate]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('deleteuser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "deleteUser", null);
exports.LoginController = LoginController = __decorate([
    (0, common_1.Controller)('/login'),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], LoginController);
//# sourceMappingURL=login.controller.js.map