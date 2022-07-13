import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint'})
    id: number;

    @Column({
        nullable: false,
        default: ''
    })
    username: string;

    @Column({
        nullable: false,
        default: ''
    })
    password: string;

    @Column({ default: 'owner'})
    role: string;

    @Column({ default: 18})
    age: number;

    @Column({
        default: ''
    })
    gender: string;

    @Column({
        name: 'email_address',
        nullable: false,
        default: ''
    })
    emailAddress: string;

    @Column('boolean', {default: false})
    actived: boolean;

    @CreateDateColumn({})
    createAt: Date;

    @UpdateDateColumn({})
    updateAt: Date;
}