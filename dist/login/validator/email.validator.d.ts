import { ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import { Repository } from "typeorm";
import { usuarios } from "../usuarios.entity";
export declare class EmailValidator implements ValidatorConstraintInterface {
    private usuariosRepository;
    constructor(usuariosRepository: Repository<usuarios>);
    validate(email: string): Promise<boolean>;
}
export declare const UniqueEmail: (ValidationOptions: ValidationOptions) => (obj: Object, property: string) => void;
