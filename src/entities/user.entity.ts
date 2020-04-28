import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {UserLoginHistory} from "./user.login.history";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500, unique: true })
    email: string;

    @Column({name: "created_date", type: "datetime"})
    createdDate: Date;

    @Column({name: "updated_date", type: "datetime"})
    updatedDate: Date;

    @OneToMany(type => UserLoginHistory, userLoginEntity => userLoginEntity.user)
    loginHistories: UserLoginHistory[];
}