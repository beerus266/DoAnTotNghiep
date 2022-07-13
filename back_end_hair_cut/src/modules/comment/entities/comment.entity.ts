import { Store } from "src/modules/store/entities/store.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @ManyToOne(type => Store, store => store.id)
    store_id: Store;

    // @ManyToOne(type => User, user => user.id)
    // user_id: User;

    @Column({})
    phoneNumber: string;

    @Column({})
    comment: string;

    @CreateDateColumn({})
    createAt: Date;

    @UpdateDateColumn({})
    updateAt: Date;
}