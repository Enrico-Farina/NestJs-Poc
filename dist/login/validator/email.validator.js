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
exports.UniqueEmail = exports.EmailValidator = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const usuarios_entity_1 = require("../usuarios.entity");
const common_1 = require("@nestjs/common");
let EmailValidator = class EmailValidator {
    constructor(usuariosRepository) {
        this.usuariosRepository = usuariosRepository;
    }
    async validate(email) {
        let userExist;
        await this.usuariosRepository.findOne({ where: { email: email } }).then((user) => {
            userExist = user;
        });
        return userExist == null;
    }
};
exports.EmailValidator = EmailValidator;
exports.EmailValidator = EmailValidator = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    __param(0, (0, typeorm_1.InjectRepository)(usuarios_entity_1.usuarios)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmailValidator);
const UniqueEmail = (ValidationOptions) => {
    return (obj, property) => {
        (0, class_validator_1.registerDecorator)({
            target: obj.constructor,
            propertyName: property,
            options: ValidationOptions,
            constraints: [],
            validator: EmailValidator
        });
    };
};
exports.UniqueEmail = UniqueEmail;
//# sourceMappingURL=email.validator.js.map