import { InjectRepository } from "@nestjs/typeorm";
import { registerDecorator, validate, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Repository } from "typeorm";
import { usuarios } from "../usuarios.entity";
import { Injectable } from "@nestjs/common";


@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidator implements ValidatorConstraintInterface {

    constructor(
        @InjectRepository(usuarios)
        private usuariosRepository: Repository<usuarios>
    ) {}

    async validate(email: string): Promise<boolean> {
        let userExist;
        await this.usuariosRepository.findOne({ where: { email: email } }).then((user) => {
            userExist = user;
        })

        return userExist == null;
    }
}

export const UniqueEmail = (ValidationOptions: ValidationOptions) => {
    return (obj: Object, property: string) => {
        registerDecorator({
            target: obj.constructor,
            propertyName: property,
            options: ValidationOptions,
            constraints: [],
            validator: EmailValidator
        })
    }
}