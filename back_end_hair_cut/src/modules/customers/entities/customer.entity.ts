import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({})
    phoneNumber: string;

    @Column({ default: 1})
    bookingCount: number;

    @CreateDateColumn({})
    createAt: Date

    @UpdateDateColumn({})
    updateAt: Date
}
