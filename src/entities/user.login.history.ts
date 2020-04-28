import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {UserEntity} from "./user.entity";

@Entity('user_login_histories')
export class UserLoginHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'user_id',
        type: "integer"
    })
    userId: number;

    @Column({
        name: "ip_address",
        type: "varchar"
    })
    ipAddress: string;

    @Column({name: "login_date", type: "datetime"})
    loginDate: Date;

    @ManyToOne(type => UserEntity, user => user.loginHistories)
    @JoinColumn({referencedColumnName: 'user_id'})
    user: UserEntity;
}