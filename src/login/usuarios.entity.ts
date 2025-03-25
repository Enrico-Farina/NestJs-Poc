import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class usuarios {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}