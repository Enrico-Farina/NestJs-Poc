"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const common_1 = require("@nestjs/common");
const login_controller_1 = require("./login.controller");
const login_service_1 = require("./login.service");
const typeorm_1 = require("@nestjs/typeorm");
const usuarios_entity_1 = require("./usuarios.entity");
const email_module_1 = require("../email/email.module");
const email_validator_1 = require("./validator/email.validator");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let LoginModule = class LoginModule {
};
exports.LoginModule = LoginModule;
exports.LoginModule = LoginModule = __decorate([
    (0, common_1.Module)({
        imports: [email_module_1.EmailModule, typeorm_1.TypeOrmModule.forFeature([usuarios_entity_1.usuarios]),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    global: true,
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1d' },
                }),
            })],
        controllers: [login_controller_1.LoginController],
        providers: [login_service_1.LoginService, email_validator_1.EmailValidator]
    })
], LoginModule);
//# sourceMappingURL=login.module.js.map