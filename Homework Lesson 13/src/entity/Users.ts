import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
export class Users {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column(({type: 'text', default: ''}))
    userName!: string;

    @Column(({type: 'text', default: ''}))
    email!: string;
}