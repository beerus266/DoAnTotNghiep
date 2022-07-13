import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Store {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({})
    name: string;

    @ManyToOne(type => User, user => user.id)
    host_id: User;

    @Column({length: 255})
    address: string;

    @Column({})
    description: string;
    
    @Column({ type: 'text'})
    content: string;
 
    @Column({ unique: true })
    slug: string;

    @Column({default: '/placeholder.jpg'})
    image_url: string

    @Column({ default: 1})
    status: number;

    @CreateDateColumn({})
    createAt: Date;

    @UpdateDateColumn({})
    updateAt: Date;
}