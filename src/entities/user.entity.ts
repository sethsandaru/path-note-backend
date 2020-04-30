import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import {UserLoginHistoryEntity} from "./user.login.history.entity";
import {BaseDateEntity} from "./types/base-date.entity";
import {NoteSpaceEntity} from "./note-space.entity";

@Entity('users')
export class UserEntity extends BaseDateEntity{
    /****
     * FIELDS
     ****/

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500, unique: true })
    email: string;

    /****
     * RELATIONSHIPS
     ****/

    /**
     * 1 User - N LoginHistories
     */
    @OneToMany(type => UserLoginHistoryEntity, loginLogEntity => loginLogEntity.user)
    @JoinColumn({name: 'user_id'})
    loginHistories: UserLoginHistoryEntity[];

    /**
     * 1 User - N NoteSpaces
     */
    @OneToMany(type => NoteSpaceEntity, noteSpace => noteSpace.user)
    @JoinColumn({name: 'user_id'})
    noteSpaces: NoteSpaceEntity[];
}